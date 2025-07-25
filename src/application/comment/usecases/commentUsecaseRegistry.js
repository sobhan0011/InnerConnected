import AddComment from './addComment.js';
import GetCommentById from './getCommentById.js';
import GetComments from './getComments.js';
import DeleteComment from './deleteComment.js';
import UpdateComment from './updateComment.js';
import ApproveComment from './approveComment.js';
import RejectComment from './rejectComment.js';


class CommentUsecaseRegistry {
	constructor({ commentRepository, userRepository, postRepository }) {
		this.addComment = new AddComment(commentRepository, userRepository, postRepository);
		this.deleteComment = new DeleteComment(commentRepository, userRepository);
		this.getComments = new GetComments(commentRepository);
		this.getCommentById = new GetCommentById(commentRepository);
		this.updateComment = new UpdateComment(commentRepository);
		this.approveComment = new ApproveComment(commentRepository);
		this.rejectComment = new RejectComment(commentRepository);
	}
}

export default CommentUsecaseRegistry;
