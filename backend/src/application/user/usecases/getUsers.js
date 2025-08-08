import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import { UserLimitedResponseDto } from '../dtos/userLimitedResponseDto.js';
import UserRoles from '../../../domain/user/userRoles.js';

class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(filters, requester) {
		filters = {
			...filters,
			role: UserRoles.USER,
		};

		const users = await this.userRepository.getUsers(filters);
		if (!users) return [];

		if (requester.role === UserRoles.ADMIN) {
			return users.map((user) => {
				return new UserResponseDto(user);
			});
		} else if (requester.role === UserRoles.USER) {
			return users.map((user) => {
				return new UserLimitedResponseDto(user);
			});
		}
	}
}

export default GetUsers;
