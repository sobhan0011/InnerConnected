import { PostResponseDto } from '../dtos/postResponseDto.js';

class GetPosts {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(filters) {
		const posts = await this.postRepository.getPosts(filters);
		if (!posts) return [];
		return posts.map((post) => {
			return new PostResponseDto(post);
		});
	}
}

export default GetPosts;
