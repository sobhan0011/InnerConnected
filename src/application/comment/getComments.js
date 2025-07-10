class GetComments {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	execute() {
		return 'GetComments';
	}
}

export default GetComments;
