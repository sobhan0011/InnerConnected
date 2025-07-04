class DeleteComment {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	execute() {
		console.log('DeleteComment');
	}
}

export default DeleteComment;
