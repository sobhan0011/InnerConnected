import AddPost from './addPost.js';
import GetPostById from './getPostById.js';
import GetPosts from './getPosts.js';
import DeletePost from './deletePost.js';
import UpdatePost from './updatePost.js';
import ApprovePost from './approvePost.js';
import RejectPost from './rejectPost.js';

class PostUsecaseRegistry {
	constructor({ postRepository, userRepository }) {
		this.addPost = new AddPost(postRepository, userRepository);
		this.deletePost = new DeletePost(postRepository);
		this.getPosts = new GetPosts(postRepository);
		this.getPostById = new GetPostById(postRepository);
		this.updatePost = new UpdatePost(postRepository);
		this.approvePost = new ApprovePost(postRepository);
		this.rejectPost = new RejectPost(postRepository);
	}
}

export default PostUsecaseRegistry;
