import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThreadsHandler from '../handler.js';
import AddThreadUseCase from '../../../../../Applications/use_case/AddThreadUseCase.js';
import GetThreadUseCase from '../../../../../Applications/use_case/GetThreadUseCase.js';

describe('ThreadsHandler', () => {
    let res;
    beforeEach(() => {
        res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });
  describe('postThreadHandler', () => {
    it('should respond with 201 and added thread data', async () => {
      // Arrange
      const req = {
        body: {
          title: 'sebuah thread',
          body: 'isi thread',
        },
        user: {
          id: 'user-123',
        },
      };

      

      const expectedAddedThread = {
        id: 'thread-123',
        title: 'sebuah thread',
        owner: 'user-123',
      };

      // Mocking Use Case
      const mockAddThreadUseCase = {
        execute: vi.fn().mockResolvedValue(expectedAddedThread),
      };

      // Mocking Container
      const mockContainer = {
        getInstance: vi.fn().mockImplementation((name) => {
          if (name === AddThreadUseCase.name) {
            return mockAddThreadUseCase;
          }
          return null;
        }),
      };

      const threadsHandler = new ThreadsHandler(mockContainer);

      // Action
      await threadsHandler.postThreadHandler(req, res);

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(AddThreadUseCase.name);
      expect(mockAddThreadUseCase.execute).toHaveBeenCalledWith({
        title: 'sebuah thread',
        body: 'isi thread',
        owner: 'user-123',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          addedThread: expectedAddedThread,
        },
      });
    });
  });

  describe('getThreadHandler', () => {
    it('should respond with 200 and thread data', async () => {
      // Arrange
      const req = {
        params: {
          threadId: 'thread-123',
        },
      };

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({}),
      };

      const expectedThread = {
        id: 'thread-123',
        title: 'sebuah thread',
        body: 'isi thread',
        comments: [],
      };

      // Mocking Use Case
      const mockGetThreadUseCase = {
        execute: vi.fn().mockResolvedValue(expectedThread),
      };

      // Mocking Container
      const mockContainer = {
        getInstance: vi.fn().mockImplementation((name) => {
          if (name === GetThreadUseCase.name) {
            return mockGetThreadUseCase;
          }
          return null;
        }),
      };

      const threadsHandler = new ThreadsHandler(mockContainer);

      // Action
      await threadsHandler.getThreadHandler(req, res);

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(GetThreadUseCase.name);
      expect(mockGetThreadUseCase.execute).toHaveBeenCalledWith('thread-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          thread: expectedThread,
        },
      });
    });
  });
});