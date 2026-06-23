import { describe, it, expect, vi, beforeEach } from 'vitest';
import RepliesHandler from '../handler.js';
import AddReplyUseCase from '../../../../../Applications/use_case/AddReplyUseCase.js';
import DeleteReplyUseCase from '../../../../../Applications/use_case/DeleteReplyUseCase.js';

describe('RepliesHandler', () => {
  let res;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  describe('postReplyHandler', () => {
    it('should respond with 201 and added reply data', async () => {
      // Arrange
      const req = {
        params: {
          threadId: 'thread-123',
          commentId: 'comment-123',
        },
        body: {
          content: 'sebuah balasan',
        },
        user: {
          id: 'user-123',
        },
      };

      const expectedAddedReply = {
        id: 'reply-123',
        content: 'sebuah balasan',
        owner: 'user-123',
      };

      const mockAddReplyUseCase = {
        execute: vi.fn().mockResolvedValue(expectedAddedReply),
      };

      const mockContainer = {
        getInstance: vi.fn().mockImplementation((name) => {
          if (name === AddReplyUseCase.name) {
            return mockAddReplyUseCase;
          }
          return null;
        }),
      };

      const repliesHandler = new RepliesHandler(mockContainer);

      // Action
      await repliesHandler.postReplyHandler(req, res);

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(AddReplyUseCase.name);
      expect(mockAddReplyUseCase.execute).toHaveBeenCalledWith({
        threadId: 'thread-123',
        commentId: 'comment-123',
        content: 'sebuah balasan',
        owner: 'user-123',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          addedReply: expectedAddedReply,
        },
      });
    });
  });

  describe('deleteReplyHandler', () => {
    it('should respond with 200 and success status', async () => {
      // Arrange
      const req = {
        params: {
          threadId: 'thread-123',
          commentId: 'comment-123',
          replyId: 'reply-123',
        },
        user: {
          id: 'user-123',
        },
      };

      const mockDeleteReplyUseCase = {
        execute: vi.fn().mockResolvedValue(undefined),
      };

      const mockContainer = {
        getInstance: vi.fn().mockImplementation((name) => {
          if (name === DeleteReplyUseCase.name) {
            return mockDeleteReplyUseCase;
          }
          return null;
        }),
      };

      const repliesHandler = new RepliesHandler(mockContainer);

      // Action
      await repliesHandler.deleteReplyHandler(req, res);

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(DeleteReplyUseCase.name);
      expect(mockDeleteReplyUseCase.execute).toHaveBeenCalledWith({
        threadId: 'thread-123',
        commentId: 'comment-123',
        replyId: 'reply-123',
        userId: 'user-123',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
      });
    });
  });
});