class UserController {
	constructor({ userUsecaseRegistry }) {
		this.userUsecaseRegistry = userUsecaseRegistry;
	}

	getUsers = async (req, res) => {
		const users = await this.userUsecaseRegistry.getUsers.execute();
		res.json(users);
	};

	getUserById = async (req, res) => {
		const user = await this.userUsecaseRegistry.getUserById.execute(req.params.id);
		res.json(user);
	};

	addUser = async (req, res) => {
		const user = await this.userUsecaseRegistry.addUser.execute(req.body);
		res.json(user);
	};

	deleteUser = async (req, res) => {
		const result = await this.userUsecaseRegistry.deleteUser.execute(req.params.id);
		res.json(result);
	};

	updateUser = async (req, res) => {
		const result = await this.userUsecaseRegistry.updateUser.execute(req.params.id, req.body);
		res.json(result);
	};

	getUserComments = async (req, res) => {
		const result = await this.userUsecaseRegistry.getUserComments.execute(req.params.id);
		res.json(result);
	};

	getUserPosts = async (req, res) => {
		const result = await this.userUsecaseRegistry.getUserPosts.execute(req.params.id);
		res.json(result);
	};
}

export default UserController;
