class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		this.userRepository.getAllUsers();
	}
}

export default GetUsers;
