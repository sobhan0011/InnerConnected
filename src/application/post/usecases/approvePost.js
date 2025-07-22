import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';

class ApprovePost {
	constructor(postRepository, userRepository) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	async execute(postId, requester) {
		const existingPost = await this.postRepository.getPostById(postId);
		if (!existingPost) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);

		const postOwner = await this.userRepository.getUserById(existingPost.userId);
		const requesterOwnsPost = existingPost.userId === requester.id;
		const postOwnerIsAdmin = postOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;

		if (!requesterIsAdmin || (requesterIsAdmin && postOwnerIsAdmin && !requesterOwnsPost))
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);

		if (!existingPost.approved) {
			existingPost.approved = true;
			await this.postRepository.updatePostApprovalStatus(postId, existingPost.approved);
		}
		return new PostResponseDto(existingPost);
	}
}

export default ApprovePost;
