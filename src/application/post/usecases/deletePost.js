class DeletePost {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(postId) {
		await this.postRepository.deletePost(postId);
		return { message: 'Success' };
	}
}

export default DeletePost;
