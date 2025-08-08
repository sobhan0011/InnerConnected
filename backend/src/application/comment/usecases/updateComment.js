import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import { validateUpdateCommentFields } from '../validators/commentUpdateValidator.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class UpdateComment {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(commentId, commentData, requester) {
		validateUpdateCommentFields(commentData);

		const existingComment = await this.commentRepository.getCommentById(commentId);
		if (!existingComment) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);

		const commentOwner = await this.userRepository.getUserById(commentData.userId);
		const requesterOwnsComment = commentData.userId === requester.id;
		const commentOwnerIsAdmin = commentOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;

		if (!requesterOwnsComment && (!requesterIsAdmin || commentOwnerIsAdmin)) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		existingComment.content = commentData.content ?? existingComment.content;
		existingComment.userId = commentData.userId ?? existingComment.userId;
		existingComment.postId = commentData.postId ?? existingComment.postId;

		await this.commentRepository.updateComment(existingComment);
		return new CommentResponseDto(existingComment);
	}
}

export default UpdateComment;
