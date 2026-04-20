import express from 'express';
import authMiddleware from '../../../../Commons/middleware/authMiddleware.js';

const createCommentsRouter = (handler) => {
  const router = express.Router();

  router.post('/threads/:threadId/comments', authMiddleware, handler.postCommentHandler);
  router.delete('/threads/:threadId/comments/:commentId', authMiddleware, handler.deleteCommentHandler);

  return router;
};

export default createCommentsRouter;