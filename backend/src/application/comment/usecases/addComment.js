import Comment from '../../../domain/comment/comment.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';
import { validateCreateCommentFields } from '../validators/commentCreateValidator.js';
import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import UserRoles from '../../../domain/user/userRoles.js';

class AddComment {
	constructor(commentRepository, userRepository, postRepository) {
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
		this.postRepository = postRepository;
	}

	async execute(commentData, requester) {
		validateCreateCommentFields(commentData);
		await this.checkAddCommentAccessRules(commentData, requester);
		const comment = await Comment.create(commentData);
		await this.commentRepository.addComment(comment);
		return CommentResponseDto(comment);
	}

	async checkAddCommentAccessRules(commentData, requester) {
		const commentOwner = await this.userRepository.getUserById(commentData.userId);
		if (!commentOwner) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const requesterOwnsComment = commentData.userId === requester.id;
		const commentOwnerIsAdmin = commentOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;
		if (!requesterOwnsComment && (commentOwnerIsAdmin || !requesterIsAdmin)) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		const post = await this.postRepository.getPostById(commentData.postId);
		if (!post) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);
	}
}

export default AddComment;
