import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';

class GetPostById {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(postId) {
		const post = await this.postRepository.getPostById(postId);
		if (!post) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);
		return new PostResponseDto(post);
	}
}

export default GetPostById;
