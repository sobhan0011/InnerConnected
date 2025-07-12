import Comment from '../../../domain/comment/comment.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';
import { validateCreateCommentFields } from '../validators/commentCreateValidator.js';
import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';

class AddComment {
	constructor(commentRepository, userRepository, postRepository) {
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
		this.postRepository = postRepository;
	}

	async execute(commentData) {
		validateCreateCommentFields(commentData);
		const user = await this.userRepository.getUserById(commentData.userId);
		if (!user) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		const post = await this.postRepository.getPostById(commentData.postId);
		if (!post) throw new CustomError(ERROR_CODES.POST_NOT_FOUND);
		const comment = await Comment.create(commentData);
		await this.commentRepository.addComment(comment);
		return CommentResponseDto(comment);
	}
}

export default AddComment;
