import pool from '../../database/postgres/pool.js';

import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres.js';

import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';

import NotFoundError from '../../../Commons/exceptions/NotFoundError.js';

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-123',
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    });
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread and return added thread correctly', async () => {
      // Arrange
      const newThread = {
        title: 'judul thread',
        body: 'isi thread',
        owner: 'user-123',
      };

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.addThread(newThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const newThread = {
        title: 'judul thread',
        body: 'isi thread',
        owner: 'user-123',
      };

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      expect(addedThread).toStrictEqual({
        id: 'thread-123',
        title: 'judul thread',
        owner: 'user-123',
      });
    });
  });

  describe('verifyThreadExist function', () => {
    it('should throw NotFoundError when thread is not exist', async () => {
      // Arrange
      const threadId = 'must be not found';
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadExist(threadId),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when thread is exist', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'judul thread',
        body: 'isi thread',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadExist('thread-123'),
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should return thread correctly', async () => {
      // Arrange
      const threadDate = new Date();
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'judul thread',
        body: 'isi thread',
        owner: 'user-123',
        date: threadDate,
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const thread = await threadRepositoryPostgres.getThreadById('thread-123');

      // Assert
      expect(thread).toHaveProperty('id', 'thread-123');
      expect(thread).toHaveProperty('title', 'judul thread');
      expect(thread).toHaveProperty('body', 'isi thread');
      expect(thread).toHaveProperty('username', 'dicoding');
      expect(thread).toHaveProperty('date', threadDate);
    });

    it('should return undefined when thread is not exist', async () => {
      // Arrange
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const thread = await threadRepositoryPostgres.getThreadById('must be not found');

      // Assert
      expect(thread).toBeUndefined();
    });
  });
});