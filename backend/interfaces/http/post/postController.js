class PostController {
	constructor({ postUsecaseRegistry }) {
		this.postUsecaseRegistry = postUsecaseRegistry;
	}

	getPosts = async (req, res) => {
		const filters = req.query;
		const requester = req.user;
		const posts = await this.postUsecaseRegistry.getPosts.execute(filters, requester);
		res.json(posts);
	};

	getPostById = async (req, res) => {
		const postId = req.params.id;
		const requester = req.user;
		const post = await this.postUsecaseRegistry.getPostById.execute(postId, requester);
		res.json(post);
	};

	addPost = async (req, res) => {
		const postData = req.body;
		const requester = req.user;
		if (!postData.userId) postData.userId = requester.id;
		const post = await this.postUsecaseRegistry.addPost.execute(postData, requester);
		res.json(post);
	};

	deletePost = async (req, res) => {
		const postId = req.params.id;
		const requester = req.user;
		const result = await this.postUsecaseRegistry.deletePost.execute(postId, requester);
		res.json(result);
	};

	updatePost = async (req, res) => {
		const postId = req.params.id;
		const postData = req.body;
		const requester = req.user;
		if (!postData.userId) postData.userId = requester.id;
		const result = await this.postUsecaseRegistry.updatePost.execute(postId, postData, requester);
		res.json(result);
	};
}

export default PostController;
