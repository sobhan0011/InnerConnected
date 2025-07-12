import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';
import { validateUpdatePostFields } from '../validators/postUpdateValidator.js';

class UpdatePost {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(postId, postData) {
		validateUpdatePostFields(postData);
		const existingPost = await this.postRepository.getPostById(postId);
		if (!existingPost) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);
		existingPost.title = postData.title ?? existingPost.title;
		existingPost.content = postData.content ?? existingPost.content;
		await this.postRepository.updatePost(existingPost);
		return new PostResponseDto(existingPost);
	}
}

export default UpdatePost;
