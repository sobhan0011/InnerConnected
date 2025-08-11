class UserController {
	constructor({ userUsecaseRegistry }) {
		this.userUsecaseRegistry = userUsecaseRegistry;
	}

	getUsers = async (req, res) => {
		const filters = req.query;
		const requester = req.user;
		const users = await this.userUsecaseRegistry.getUsers.execute(filters, requester);
		res.json(users);
	};

	getUserById = async (req, res) => {
		const userId = req.params.id || req.user.id;
		const requester = req.user;
		const user = await this.userUsecaseRegistry.getUserById.execute(userId, requester);
		res.json(user);
	};

	addUser = async (req, res) => {
		const userData = req.body;
		const requester = req.user;
		const user = await this.userUsecaseRegistry.addUser.execute(userData, requester);
		res.json(user);
	};

	deleteUser = async (req, res) => {
		const userId = req.params.id || req.user.id;
		const requester = req.user;
		const result = await this.userUsecaseRegistry.deleteUser.execute(userId, requester);
		res.json(result);
	};

	updateUser = async (req, res) => {
		const userId = req.params.id || req.user.id;
		const userData = req.body;
		const requester = req.user;
		const result = await this.userUsecaseRegistry.updateUser.execute(userId, userData, requester);
		res.json(result);
	};

	uploadProfileImage = async (req, res) => {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded.' });
		}
		const filePath = `/uploads/${req.file.filename}`;
		const userId = req.user.id;
		const result = await this.userUsecaseRegistry.uploadProfileImage.execute(userId, filePath);
		res.json(result);
	};

	getUserChats = async (req, res) => {
		const userId = req.params.id || req.user.id;
		const requester = req.user;
		const user = await this.userUsecaseRegistry.getUserChats.execute(userId, requester);
		res.json(user);
	};
}

export default UserController;
