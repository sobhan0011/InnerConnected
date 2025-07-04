class DeletePost {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	execute() {
		console.log('DeletePost');
	}
}

export default DeletePost;
