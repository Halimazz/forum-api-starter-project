import express from 'express';
import authMiddleware from '../../../../Commons/middleware/authMiddleware.js';

const createThreadsRouter = (handler) => {
  const router = express.Router();

  router.post('/', authMiddleware, handler.postThreadHandler);
  router.get('/:threadId', handler.getThreadHandler);

  return router;
};

export default createThreadsRouter;