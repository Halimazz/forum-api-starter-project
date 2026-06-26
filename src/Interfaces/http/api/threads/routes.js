import express from 'express';
import jwt from 'jsonwebtoken';
import createAuthMiddleware from '../../middleware/authMiddleware.js';

const authMiddleware = createAuthMiddleware(jwt);

const createThreadsRouter = (handler) => {
  const router = express.Router();

  router.post('/', authMiddleware, handler.postThreadHandler);
  router.get('/:threadId', handler.getThreadHandler);

  return router;
};

export default createThreadsRouter;