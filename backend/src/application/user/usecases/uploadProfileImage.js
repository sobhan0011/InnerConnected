import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import dotenv from 'dotenv';
dotenv.config();

class UploadProfileImage {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId, filePath) {
		const existingUser = await this.userRepository.getUserById(userId);
		if (!existingUser) {
			throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		}
		await this.userRepository.updateUserProfileImage(userId, filePath);
		return { message: 'success' };
	}
}

export default UploadProfileImage;
