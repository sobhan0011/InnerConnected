import { PostResponseDto } from '../dtos/postResponseDto.js';
import { PostWithUserResponseDto } from '../dtos/postWithUserResponseDto.js';

class GetPosts {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(filters) {
		const { includeUser } = filters;
		delete filters.includeUser;

		const postsData = includeUser
			? await this.postRepository.getPostsWithUser(filters)
			: await this.postRepository.getPosts(filters);

		if (!postsData) return [];

		const PostDto = includeUser ? PostWithUserResponseDto : PostResponseDto;
		return postsData.map((post) => {
			return new PostDto(post);
		});
	}
}

export default GetPosts;
