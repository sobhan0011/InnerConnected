class AuthController {
	constructor({ userUsecaseRegistry }) {
		this.userUsecaseRegistry = userUsecaseRegistry;
	}

	userSignup = async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const result = await this.userUsecaseRegistry.userSignup.execute(email, password);
		res.json(result);
	};

	userLogin = async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const result = await this.userUsecaseRegistry.userLogin.execute(email, password);
		res.json(result);
	};
}

export default AuthController;
