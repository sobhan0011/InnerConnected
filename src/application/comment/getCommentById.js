class GetCommentById {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	execute() {
		console.log('GetCommentById');
	}
}

export default GetCommentById;
