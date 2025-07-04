class AddPost {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	execute() {
		console.log('AddPost');
	}
}

export default AddPost;
