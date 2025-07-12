import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import { validatUpdateUserFields } from '../validators/userUpdateValidator.js';

class UpdateUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId, userData) {
		validatUpdateUserFields(userData);
		const { firstName: newFirstName, lastName: newLastName, username: newUsername, phoneNumber: newPhoneNumber } = userData;

		const existingUser = await this.userRepository.getUserById(userId);
		if (!existingUser) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const { firstName: oldFirstName, lastName: oldLastName, username: oldUsername, phoneNumber: oldPhoneNumber } = existingUser;

		if (newUsername && oldUsername !== newUsername) {
			const existingByUsername = await this.userRepository.getByUsername(newUsername);
			if (existingByUsername) {
				throw new CustomError(ERROR_CODES.USERNAME_ALREADY_EXISTS);
			}
		}

		existingUser.firstName = newFirstName ?? oldFirstName;
		existingUser.lastName = newLastName ?? oldLastName;
		existingUser.username = newUsername ?? oldUsername;
		existingUser.phoneNumber = newPhoneNumber ?? oldPhoneNumber;
		await this.userRepository.updateUser(existingUser);
		return new UserResponseDto(existingUser);
	}
}

export default UpdateUser;
