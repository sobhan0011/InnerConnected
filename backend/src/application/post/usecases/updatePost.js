import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { validateUpdatePostFields } from '../validators/postUpdateValidator.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';

class UpdatePost {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(postId, postData, requester) {
		validateUpdatePostFields(postData);

		const existingPost = await this.postRepository.getPostById(postId);
		if (!existingPost) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);

		const postOwner = await this.userRepository.getUserById(postData.userId);
		const requesterOwnsPost = postData.userId === requester.id;
		const postOwnerIsAdmin = postOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;

		if (!requesterOwnsPost && (!requesterIsAdmin || postOwnerIsAdmin)) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		existingPost.content = postData.content ?? existingPost.content;
		existingPost.userId = postData.userId ?? existingPost.userId;
		existingPost.postId = postData.postId ?? existingPost.postId;

		await this.postRepository.updatePost(existingPost);
		return new PostResponseDto(existingPost);
	}
}

export default UpdatePost;
