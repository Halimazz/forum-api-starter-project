import RepliesHandler from './handler.js';
import createRepliesRouter from './routes.js';

const repliesPlugin = (container) => {
const  repliesHandler= new RepliesHandler(container);
  return createRepliesRouter(repliesHandler);
 };

export default repliesPlugin;