import CommentsHandler from './handler.js';
import createCommentsRouter from './routes.js';

const commentsPlugin = (container) => {
  const commentsHandler = new CommentsHandler(container);
  return createCommentsRouter(commentsHandler);
};

export default commentsPlugin;