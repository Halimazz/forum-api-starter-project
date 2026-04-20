import AddReplyUseCase from '../../../../Applications/use_case/AddReplyUseCase.js';
import DeleteReplyUseCase from '../../../../Applications/use_case/DeleteReplyUseCase.js';

class RepliesHandler {
  constructor(container) {
    this._container = container;
    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(req, res) {
    const { threadId, commentId } = req.params;
    const { content } = req.body;
    const { id: owner } = req.user;

    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase.execute({
      threadId,
      commentId,
      content,
      owner,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        addedReply,
      },
    });
  }

  async deleteReplyHandler(req, res) {
    const { threadId, commentId, replyId } = req.params;
    const { id: userId } = req.user;

    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    await deleteReplyUseCase.execute({
      threadId,
      commentId,
      replyId,
      userId,
    });

    return res.status(200).json({
      status: 'success',
    });
  }
}

export default RepliesHandler;