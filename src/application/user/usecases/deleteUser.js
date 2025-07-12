class DeleteUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId) {
		await this.userRepository.deleteUser(userId);
		return { message: 'Success' };
	}
}

export default DeleteUser;
