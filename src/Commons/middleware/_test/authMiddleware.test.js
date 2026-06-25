import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import authMiddleware from '../authMiddleware';

vi.mock('jsonwebtoken');

describe('authMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it('should return 401 when authorization header is missing', () => {
    // Arrange
    req.headers.authorization = undefined;

    // Action
    authMiddleware(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Missing authentication',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when authorization header does not start with Bearer', () => {
    // Arrange
    req.headers.authorization = 'Basic sometoken';

    // Action
    authMiddleware(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Missing authentication',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when token is invalid', () => {
    // Arrange
    req.headers.authorization = 'Bearer invalidtoken';
    jwt.verify.mockImplementation(() => {
      throw new Error('invalid token');
    });

    // Action
    authMiddleware(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Token tidak valid',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next and set req.user when token is valid', () => {
    // Arrange
    const decoded = { id: 'user-123', username: 'dicoding' };
    req.headers.authorization = 'Bearer validtoken';
    jwt.verify.mockReturnValue(decoded);

    // Action
    authMiddleware(req, res, next);

    // Assert
    expect(req.user).toStrictEqual(decoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});