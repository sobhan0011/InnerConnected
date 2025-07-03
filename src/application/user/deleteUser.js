class DeleteUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		console.log('DeleteUser');
	}
}

export default DeleteUser;
