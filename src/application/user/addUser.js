class AddUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		console.log('AddUser');
	}
}

export default AddUser;
