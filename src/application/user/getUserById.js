class GetUserById {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		console.log('GetUserById');
	}
}

export default GetUserById;
