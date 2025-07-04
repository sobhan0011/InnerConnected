class PostController {
	constructor({ postUsecaseRegistry }) {
		this.postUsecaseRegistry = postUsecaseRegistry;
	}

	getPosts = async (req, res) => {
		const posts = await this.postUsecaseRegistry.getPosts.execute();
		res.json(posts);
	};

	getPostById = async (req, res) => {
		const post = await this.postUsecaseRegistry.getPostById.execute(req.params.id);
		res.json(post);
	};

	addPost = async (req, res) => {
		const post = await this.postUsecaseRegistry.addPost.execute(req.body);
		res.json(post);
	};

	deletePost = async (req, res) => {
		const result = await this.postUsecaseRegistry.deletePost.execute(req.params.id);
		res.json(result);
	};

	updatePost = async (req, res) => {
		const result = await this.postUsecaseRegistry.updatePost.execute(req.params.id, req.body);
		res.json(result);
	};
}

export default PostController;
