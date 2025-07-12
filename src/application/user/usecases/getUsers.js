import { UserResponseDto } from '../dtos/userResponseDto.js';

class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute() {
		const users = await this.userRepository.getAllUsers();
		if (!users) return [];
		return users.map((user) => {
			return new UserResponseDto(user);
		});
	}
}

export default GetUsers;
