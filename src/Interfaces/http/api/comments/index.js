import CommentsHandler from './handler.js';
import routes from './routes.js';
import express from 'express';

const router = express.Router();

const commentsPlugin = (container) => {
  const commentsHandler = new CommentsHandler(container);
  routes(router, commentsHandler);
  return router;
};

export default commentsPlugin;