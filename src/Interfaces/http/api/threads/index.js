import ThreadsHandler from './handler.js';
import createThreadsRouter from './routes.js';

const threadsPlugin = (container) => {
  const threadsHandler = new ThreadsHandler(container);
  return createThreadsRouter(threadsHandler);
};

export default threadsPlugin;