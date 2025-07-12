import { PostResponseDto } from '../dtos/postResponseDto.js';

class GetPosts {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute() {
		const posts = await this.postRepository.getAllPosts();
		if (!posts) return [];
		return posts.map((post) => {
			return new PostResponseDto(post);
		});
	}
}

export default GetPosts;
