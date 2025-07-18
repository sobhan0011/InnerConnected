import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import User from '../../../domain/user/user.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import { validateCreateUserFields } from '../validators/userCreateValidator.js';

class UserSignup {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userData) {
		userData.role = UserRoles.USER;
		validateCreateUserFields(userData);

		const existingByEmail = await this.userRepository.getByEmail(userData.email);
		if (existingByEmail) {
			throw new CustomError(ERROR_CODES.EMAIL_ALREADY_EXISTS);
		}

		const existingByUsername = await this.userRepository.getByUsername(userData.username);
		if (existingByUsername) {
			throw new CustomError(ERROR_CODES.USERNAME_ALREADY_EXISTS);
		}

		const user = await User.create(userData);
		await this.userRepository.addUser(user);
		return UserResponseDto(user);
	}
}

export default UserSignup;
