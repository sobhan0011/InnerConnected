import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { validatUpdateUserFields } from '../validators/userUpdateValidator.js';
import bcrypt from 'bcrypt';

class UpdateUser {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId, userData, requester) {
		validatUpdateUserFields(userData);

		const targetUser = await this.userRepository.getUserById(userId);
		if (!targetUser) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const isSelf = requester.id === userId;
		const isAdmin = requester.role === UserRoles.ADMIN;
		const isUser = requester.role === UserRoles.USER;

		if (!isSelf && !isAdmin) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}
		if (isUser && !isSelf) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		if (isAdmin && targetUser.role !== UserRoles.USER) {
			throw new CustomError(ERROR_CODES.NO_PERMISSION_TO_UPDATE_ADMIN);
		}

		let allowedFields = [];
		if (isUser) {
			allowedFields = ['firstName', 'lastName', 'username'];
		} else if (isAdmin) {
			allowedFields = ['firstName', 'lastName', 'username', 'phoneNumber', 'email', 'password', 'role'];
		}

		for (const key of Object.keys(userData)) {
			if (!allowedFields.includes(key)) {
				throw new CustomError(ERROR_CODES.NO_PERMISSION_TO_UPDATE_FIELD(key));
			}
		}

		if (userData.username && userData.username !== targetUser.username) {
			const existingByUsername = await this.userRepository.getByUsername(userData.username);
			if (existingByUsername) {
				throw new CustomError(ERROR_CODES.USERNAME_ALREADY_EXISTS);
			}
		}

		if (userData.email && userData.email !== targetUser.email) {
			const existingByEmail = await this.userRepository.getByEmail(userData.email);
			if (existingByEmail) {
				throw new CustomError(ERROR_CODES.EMAIL_ALREADY_EXISTS);
			}
		}

		for (const key of allowedFields) {
			if (key in userData) {
				targetUser[key] = userData[key];
			}
		}

		const saltRounds = 10;
		if (targetUser.password) targetUser.password = await bcrypt.hash(targetUser.password, saltRounds);

		await this.userRepository.updateUser(targetUser);
		return new UserResponseDto(targetUser);
	}
}

export default UpdateUser;
