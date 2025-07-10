class GetPosts {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	execute() {
		return 'GetPosts';
	}
}

export default GetPosts;
