import AddPost from './addPost.js';
import GetPostById from './getPostById.js';
import GetPosts from './getPosts.js';
import DeletePost from './deletePost.js';

class PostUsecaseRegistry {
	constructor({ postRepository }) {
		this.addPost = new AddPost(postRepository);
		this.deletePost = new DeletePost(postRepository);
		this.getPosts = new GetPosts(postRepository);
		this.getPostById = new GetPostById(postRepository);
	}
}

export default PostUsecaseRegistry;
