class CommentController {
	constructor({ commentUsecaseRegistry }) {
		this.commentUsecaseRegistry = commentUsecaseRegistry;
	}

	getComments = async (req, res) => {
		const comments = await this.commentUsecaseRegistry.getComments.execute();
		res.json(comments);
	};

	getCommentById = async (req, res) => {
		const commentId = req.params.id;
		const comment = await this.commentUsecaseRegistry.getCommentById.execute(commentId);
		res.json(comment);
	};

	addComment = async (req, res) => {
		const commentData = req.body;
		const comment = await this.commentUsecaseRegistry.addComment.execute(commentData);
		res.json(comment);
	};

	deleteComment = async (req, res) => {
		const commentId = req.params.id;
		const result = await this.commentUsecaseRegistry.deleteComment.execute(commentId);
		res.json(result);
	};

	updateComment = async (req, res) => {
		const commentId = req.params.id;
		const commentData = req.body;
		const comment = await this.commentUsecaseRegistry.updateComment.execute(commentId, commentData);
		res.json(comment);
	};
}

export default CommentController;
