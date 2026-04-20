import express from 'express';
import RepliesHandler from './handler.js';
import createRepliesRouter from './routes.js';

const repliesPlugin = (container) => {
  const router = express.Router();
  const repliesHandler = new RepliesHandler(container);

  
  createRepliesRouter(router, repliesHandler);

  return router;
};

export default repliesPlugin;