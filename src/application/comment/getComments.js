class GetComments {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	execute() {
		this.commentRepository.getAllComments();
	}
}

export default GetComments;
