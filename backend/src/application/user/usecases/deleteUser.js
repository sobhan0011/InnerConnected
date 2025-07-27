import UserRoles from '../../../domain/user/userRoles.js';
import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';

class DeleteUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId, requester) {
		const targetUser = await this.userRepository.getUserById(userId);
		if (!targetUser) return { message: 'Success' };

		if (
			(requester.role === UserRoles.USER && requester.id !== userId) ||
			(requester.role === UserRoles.ADMIN && UserRoles.ADMIN === targetUser.role)
		) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		await this.userRepository.deleteUser(userId);
		return { message: 'Success' };
	}
}

export default DeleteUser;
