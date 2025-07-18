import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import UserRoles from '../../../domain/user/userRoles.js';

class GetUserById {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId, requester) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const isSelf = requester.id === userId;
		const isSuperAdmin = requester.role === UserRoles.SUPER_ADMIN;
		const isAdmin = requester.role === UserRoles.ADMIN;

		if (!isSelf && !isSuperAdmin) {
			if (isAdmin && user.role !== UserRoles.USER) {
				throw new CustomError(ERROR_CODES.UNAUTHORIZED);
			}
			if (!isAdmin) {
				throw new CustomError(ERROR_CODES.UNAUTHORIZED);
			}
		}

		return new UserResponseDto(user);
	}
}

export default GetUserById;
