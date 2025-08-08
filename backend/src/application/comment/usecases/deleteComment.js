import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';

class DeleteComment {
	constructor(commentRepository, userRepository) {
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
	}

	async execute(commentId, requester) {
		await this.checkDeleteCommentAccessRules(commentId, requester);
		await this.commentRepository.deleteComment(commentId, requester);
		return { message: 'Success' };
	}

	async checkDeleteCommentAccessRules(commentId, requester) {
		const commentData = await this.commentRepository.getCommentById(commentId);
		if (!commentData) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);

		const commentOwner = await this.userRepository.getUserById(commentData.userId);
		if (!commentOwner) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const requesterOwnsComment = commentData.userId === requester.id;
		const commentOwnerIsAdmin = commentOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;

		if (!requesterOwnsComment && (!requesterIsAdmin || commentOwnerIsAdmin)) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
	}
}

export default DeleteComment;
