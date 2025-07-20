class CommentController {
	constructor({ commentUsecaseRegistry }) {
		this.commentUsecaseRegistry = commentUsecaseRegistry;
	}

	getComments = async (req, res) => {
		const filters = req.query;
		const requester = req.user;
		const comments = await this.commentUsecaseRegistry.getComments.execute(filters, requester);
		res.json(comments);
	};

	getCommentById = async (req, res) => {
		const commentId = req.params.id;
		const requester = req.user;
		const comment = await this.commentUsecaseRegistry.getCommentById.execute(commentId, requester);
		res.json(comment);
	};

	addComment = async (req, res) => {
		const commentData = req.body;
		const requester = req.user;
		const comment = await this.commentUsecaseRegistry.addComment.execute(commentData, requester);
		res.json(comment);
	};

	deleteComment = async (req, res) => {
		const commentId = req.params.id;
		const requester = req.user;
		const result = await this.commentUsecaseRegistry.deleteComment.execute(commentId, requester);
		res.json(result);
	};

	updateComment = async (req, res) => {
		const commentId = req.params.id;
		const commentData = req.body;
		const requester = req.user;
		const comment = await this.commentUsecaseRegistry.updateComment.execute(commentId, commentData, requester);
		res.json(comment);
	};

	approveComment = async (req, res) => {
		const commentId = req.params.id;
		const requester = req.user;
		const result = await this.commentUsecaseRegistry.approveComment.execute(commentId, requester);
		res.json(result);
	};

	rejectComment = async (req, res) => {
		const commentId = req.params.id;
		const requester = req.user;
		const result = await this.commentUsecaseRegistry.rejectComment.execute(commentId, requester);
		res.json(result);
	};
}

export default CommentController;
