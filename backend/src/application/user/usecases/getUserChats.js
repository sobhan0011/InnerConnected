import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { UserChatWithUserPreviewResponseDto } from '../dtos/userChatWithUserPreviewResponseDto.js';

class GetUserChats {
	constructor(userRepository, chatRepository) {
		this.userRepository = userRepository;
		this.chatRepository = chatRepository;
	}

	async execute(userId, requester) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const isSelf = requester.id === userId;
		const isAdmin = requester.role === UserRoles.ADMIN;

		if (!isSelf && !isAdmin) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		const chatsWithDetail = await this.chatRepository.getChatsWithUserPreview({ userId });

		return chatsWithDetail.map((chatWithDetail) => {
			return new UserChatWithUserPreviewResponseDto(chatWithDetail);
		});
	}
}

export default GetUserChats;
