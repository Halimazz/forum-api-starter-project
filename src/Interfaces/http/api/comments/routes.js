import express from 'express';
import jwt from 'jsonwebtoken';
import createAuthMiddleware from '../../middleware/authMiddleware.js';

const authMiddleware = createAuthMiddleware(jwt);

const createCommentsRouter = (handler) => {
  const router = express.Router();

  router.post('/threads/:threadId/comments', authMiddleware, handler.postCommentHandler);
  router.delete('/threads/:threadId/comments/:commentId', authMiddleware, handler.deleteCommentHandler);

  return router;
};

export default createCommentsRouter;