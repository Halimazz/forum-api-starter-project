import express from 'express';
import authMiddleware from '../../../../Commons/middleware/authMiddleware.js';

const createRepliesRouter = (handler) => {
  const router = express.Router();

  router.post('/threads/:threadId/comments/:commentId/replies', authMiddleware, handler.postReplyHandler);
  router.delete('/threads/:threadId/comments/:commentId/replies/:replyId', authMiddleware, handler.deleteReplyHandler);

  return router;
};

export default createRepliesRouter;