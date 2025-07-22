import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';

class GetPostById {
	constructor(postRepository) {
		this.postRepository = postRepository;
	}

	async execute(postId, requester) {
		const post = await this.postRepository.getPostById(postId);
		await this.checkGetPostByIdAccessRules(post, requester);
		return new PostResponseDto(post);
	}

	async checkGetPostByIdAccessRules(post, requester) {
		if (!post) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;
		const requesterOwnsPost = post.userId === requester.id;
		if (!requesterIsAdmin && !requesterOwnsPost && !post.approved) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
	}
}

export default GetPostById;
