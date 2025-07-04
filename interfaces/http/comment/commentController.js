class CommentController {
	constructor({ commentUsecaseRegistry }) {
		this.commentUsecaseRegistry = commentUsecaseRegistry;
	}

	getComments = async (req, res) => {
		const comments = await this.commentUsecaseRegistry.getComments.execute();
		res.json(comments);
	};

	getCommentById = async (req, res) => {
		const comment = await this.commentUsecaseRegistry.getCommentById.execute(req.params.id);
		res.json(comment);
	};

	addComment = async (req, res) => {
		const comment = await this.commentUsecaseRegistry.addComment.execute(req.body);
		res.json(comment);
	};

	deleteComment = async (req, res) => {
		const result = await this.commentUsecaseRegistry.deleteComment.execute(req.params.id);
		res.json(result);
	};

	updateComment = async (req, res) => {
		const comment = await this.commentUsecaseRegistry.updateComment.execute(req.params.id, req.body);
		res.json(comment);
	};
}

export default CommentController;
