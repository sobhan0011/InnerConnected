class PostController {
	constructor({ postUsecaseRegistry }) {
		this.postUsecaseRegistry = postUsecaseRegistry;
	}

	getPosts = async (req, res) => {
		const posts = await this.postUsecaseRegistry.getPosts.execute();
		res.json(posts);
	};

	getPostById = async (req, res) => {
		const postId = req.params.id;
		const post = await this.postUsecaseRegistry.getPostById.execute(postId);
		res.json(post);
	};

	addPost = async (req, res) => {
		const postData = req.body;
		const post = await this.postUsecaseRegistry.addPost.execute(postData);
		res.json(post);
	};

	deletePost = async (req, res) => {
		const postId = req.params.id;
		const result = await this.postUsecaseRegistry.deletePost.execute(postId);
		res.json(result);
	};

	updatePost = async (req, res) => {
		const postId = req.params.id;
		const postData = req.body;
		const result = await this.postUsecaseRegistry.updatePost.execute(postId, postData);
		res.json(result);
	};
}

export default PostController;
