class UserController {
	constructor({ userUsecaseRegistry }) {
		this.userUsecaseRegistry = userUsecaseRegistry;
	}

	getUsers = async (req, res) => {
		const users = await this.userUsecaseRegistry.getUsers.execute();
		res.json(users);
	};

	getUserById = async (req, res) => {
		const userId = req.params.id;
		const user = await this.userUsecaseRegistry.getUserById.execute(userId);
		res.json(user);
	};

	addUser = async (req, res) => {
		const userData = req.body;
		const user = await this.userUsecaseRegistry.addUser.execute(userData);
		res.json(user);
	};

	deleteUser = async (req, res) => {
		const userId = req.params.id;
		const result = await this.userUsecaseRegistry.deleteUser.execute(userId);
		res.json(result);
	};

	updateUser = async (req, res) => {
		const userId = req.params.id;
		const userData = req.body;
		const result = await this.userUsecaseRegistry.updateUser.execute(userId, userData);
		res.json(result);
	};
}

export default UserController;
