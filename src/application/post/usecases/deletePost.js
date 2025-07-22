import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';

class DeletePost {
	constructor(postRepository, userRepository) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	async execute(postId, requester) {
		await this.checkDeletePostAccessRules(postId, requester);
		await this.postRepository.deletePost(postId, requester);
		return { message: 'Success' };
	}

	async checkDeletePostAccessRules(postId, requester) {
		const postData = await this.postRepository.getPostById(postId);
		if (!postData) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);

		const postOwner = await this.userRepository.getUserById(postData.userId);
		if (!postOwner) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const requesterOwnsPost = postData.userId === requester.id;
		const postOwnerIsAdmin = postOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role ===  UserRoles.ADMIN;

		if (!requesterOwnsPost && (!requesterIsAdmin || postOwnerIsAdmin)) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
	}
}

export default DeletePost;
