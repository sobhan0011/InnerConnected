import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class RejectComment {
	constructor(commentRepository, userRepository) {
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
	}

	async execute(commentId, requester) {
		const existingComment = await this.commentRepository.getCommentById(commentId);
		if (!existingComment) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);

		const commentOwner = await this.userRepository.getUserById(existingComment.userId);
		const requesterOwnsComment = existingComment.userId === requester.id;
		const commentOwnerIsAdmin = commentOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;

		if (!requesterIsAdmin || (requesterIsAdmin && commentOwnerIsAdmin && !requesterOwnsComment))
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);

		if (existingComment.approved) {
			existingComment.approved = false;
			await this.commentRepository.updateCommentApprovalStatus(commentId, existingComment.approved);
		}
		return new CommentResponseDto(existingComment);
	}
}

export default RejectComment;
