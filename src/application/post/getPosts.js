class GetPosts {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	execute() {
		this.postRepository.getAllPosts();
	}
}

export default GetPosts;
