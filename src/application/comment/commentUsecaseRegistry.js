import AddComment from './addComment.js';
import GetCommentById from './getCommentById.js';
import GetComments from './getComments.js';
import DeleteComment from './deleteComment.js';

class CommentUsecaseRegistry {
	constructor({ commentRepository }) {
		this.addComment = new AddComment(commentRepository);
		this.deleteComment = new DeleteComment(commentRepository);
		this.getComments = new GetComments(commentRepository);
		this.getCommentById = new GetCommentById(commentRepository);
	}
}

export default CommentUsecaseRegistry;
