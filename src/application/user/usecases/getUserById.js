import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { UserResponseDto } from '../dtos/userResponseDto.js';

class GetUserById {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		return new UserResponseDto(user);
	}
}

export default GetUserById;
