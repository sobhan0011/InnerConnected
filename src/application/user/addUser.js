class AddUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		return 'AddUser';
	}
}

export default AddUser;
