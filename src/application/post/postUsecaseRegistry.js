import AddPost from './addPost.js';
import GetPostById from './getPostById.js';
import GetPosts from './getPosts.js';
import DeletePost from './deletePost.js';
import UpdatePost from './updatePost.js';
import GetPostComments from './getPostComments.js';

class PostUsecaseRegistry {
	constructor({ postRepository }) {
		this.addPost = new AddPost(postRepository);
		this.deletePost = new DeletePost(postRepository);
		this.getPosts = new GetPosts(postRepository);
		this.getPostById = new GetPostById(postRepository);
		this.getPostComments = new GetPostComments(postRepository);
		this.updatePost = new UpdatePost(postRepository);
	}
}

export default PostUsecaseRegistry;
