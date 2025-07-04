class GetPostById {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	execute() {
		console.log('GetPostById');
	}
}

export default GetPostById;
