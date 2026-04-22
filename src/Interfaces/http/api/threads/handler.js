import AddThreadUseCase from '../../../../Applications/use_case/AddThreadUseCase.js';
import GetThreadUseCase from '../../../../Applications/use_case/GetThreadUseCase.js';

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(req, res) {
    const { title, body } = req.body;
    const { id: owner } = req.user;

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute({ title, body, owner });

    return res.status(201).json({
      status: 'success',
      data: {
        addedThread,
      },
    });
  }

  async getThreadHandler(req, res) {
    const { threadId } = req.params;

    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const thread = await getThreadUseCase.execute(threadId);

    return res.status(200).json({
      status: 'success',
      data: {
        thread,
      },
    });
  }
}

export default ThreadsHandler;