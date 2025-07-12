class DeleteComment {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(commentId) {
		await this.commentRepository.deleteComment(commentId);
		return { message: 'Success' };
	}
}

export default DeleteComment;
