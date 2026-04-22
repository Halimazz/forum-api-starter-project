import express from 'express';
import authMiddleware from '../../../../Commons/middleware/authMiddleware.js';

const createThreadsRouter = (handler) => {
  const router = express.Router();

  router.post('/threads', authMiddleware, handler.postThreadHandler);
  router.get('/threads/:threadId', handler.getThreadHandler);

  return router;
};

export default createThreadsRouter;