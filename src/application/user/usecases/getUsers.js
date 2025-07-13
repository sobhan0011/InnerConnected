import { UserResponseDto } from '../dtos/userResponseDto.js';

class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(filters) {
		const users = await this.userRepository.getUsers(filters);
		if (!users) return [];
		return users.map((user) => {
			return new UserResponseDto(user);
		});
	}
}

export default GetUsers;
