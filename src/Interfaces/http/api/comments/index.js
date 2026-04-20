import CommentsHandler from './handler.js';
import createCommentsRouter from './routes.js';
import express from 'express';

const router = express.Router();

const commentsPlugin = (container) => {
  const commentsHandler = new CommentsHandler(container);
  createCommentsRouter(router, commentsHandler);
  return router;
};

export default commentsPlugin;