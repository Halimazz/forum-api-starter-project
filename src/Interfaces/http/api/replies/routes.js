import express from 'express';
import jwt from 'jsonwebtoken';
import createAuthMiddleware from '../../middleware/authMiddleware.js';

const authMiddleware = createAuthMiddleware(jwt);
const createRepliesRouter = (handler) => {
  const router = express.Router();

  router.post('/threads/:threadId/comments/:commentId/replies', authMiddleware, handler.postReplyHandler);
  router.delete('/threads/:threadId/comments/:commentId/replies/:replyId', authMiddleware, handler.deleteReplyHandler);

  return router;
};

export default createRepliesRouter;