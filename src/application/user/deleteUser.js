class DeleteUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		return 'DeleteUser';
	}
}

export default DeleteUser;
