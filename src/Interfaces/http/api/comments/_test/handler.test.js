import { describe, it, expect, vi, beforeEach } from 'vitest';
import CommentsHandler from '../handler.js';

describe('CommentsHandler', () => {
  let container;
  let req;
  let res;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  describe('postCommentHandler', () => {
    it('should response 201 and return addedComment correctly', async () => {
      // Arrange
      const mockAddedComment = {
        id: 'comment-123',
        content: 'isi komen',
        owner: 'user-123',
      };

      req = {
        params: { threadId: 'thread-123' },
        body: { content: 'isi komen' },
        user: { id: 'user-123' },
      };

      const mockAddCommentUseCase = {
        execute: vi.fn().mockResolvedValue(mockAddedComment),
      };

      container = {
        getInstance: vi.fn().mockReturnValue(mockAddCommentUseCase),
      };

      const commentsHandler = new CommentsHandler(container);

      // Action
      await commentsHandler.postCommentHandler(req, res);

      // Assert
      expect(mockAddCommentUseCase.execute).toHaveBeenCalledWith({
        threadId: 'thread-123',
        content: 'isi komen',
        owner: 'user-123',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          addedComment: mockAddedComment,
        },
      });
    });
  });

  describe('deleteCommentHandler', () => {
    it('should response 200 and return success correctly', async () => {
      // Arrange
      req = {
        params: {
          threadId: 'thread-123',
          commentId: 'comment-123',
        },
        user: { id: 'user-123' },
      };

      const mockDeleteCommentUseCase = {
        execute: vi.fn().mockResolvedValue(undefined),
      };

      container = {
        getInstance: vi.fn().mockReturnValue(mockDeleteCommentUseCase),
      };

      const commentsHandler = new CommentsHandler(container);

      // Action
      await commentsHandler.deleteCommentHandler(req, res);

      // Assert
      expect(mockDeleteCommentUseCase.execute).toHaveBeenCalledWith({
        commentId: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
      });
    });
  });
});