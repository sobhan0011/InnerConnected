class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		return 'GetUsers';
	}
}

export default GetUsers;
