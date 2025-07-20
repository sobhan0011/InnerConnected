import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class GetCommentById {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(commentId, requester) {
		const comment = await this.commentRepository.getCommentById(commentId);
		await this.checkGetCommentByIdAccessRules(comment, requester);
		return new CommentResponseDto(comment);
	}

	async checkGetCommentByIdAccessRules(comment, requester) {
		if (!comment) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;
		const requesterOwnsComment = comment.userId === requester.id;
		if (!requesterIsAdmin && !requesterOwnsComment && !comment.approved) throw new CustomError(ERROR_CODES.UNAUTHORIZED);
	}
}

export default GetCommentById;
