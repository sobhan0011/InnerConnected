class GetUserPosts {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	execute() {
		return 'GetUserPosts';
	}
}

export default GetUserPosts;
