class AddComment {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	execute() {
		console.log('AddComment');
	}
}

export default AddComment;
