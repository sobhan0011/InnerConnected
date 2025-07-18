import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import UserRoles from '../../../domain/user/userRoles.js';

class GetUsers {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(filters, requester) {
		if (requester.role === UserRoles.USER) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		if (requester.role === UserRoles.ADMIN) {
			filters = {
				...filters,
				role: UserRoles.USER,
			};
		}

		const users = await this.userRepository.getUsers(filters);
		if (!users) return [];

		return users.map((user) => {
			return new UserResponseDto(user);
		});
	}
}

export default GetUsers;
