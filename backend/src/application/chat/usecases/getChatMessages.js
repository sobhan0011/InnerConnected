import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { MessageResponseDto } from '../dtos/messageResponseDto.js';

export class GetChatMessages {
	constructor(chatRepository, messageRepository) {
		this.chatRepository = chatRepository;
		this.messageRepository = messageRepository;
	}

	async execute(chatId, requester) {
		const chatData = await this.chatRepository.getChatById(chatId);
		if (!chatData) throw new CustomError(ERROR_CODES.CHAT_NOT_FOUND);

		if (requester.role !== UserRoles.ADMIN && chatData.user1Id !== requester.id && chatData.user2Id !== requester.id)
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);

		const messagesData = await this.messageRepository.getMessages({ chatId });

		if (!messagesData) return [];

		return messagesData.map((message) => {
			return new MessageResponseDto(message);
		});
	}
}
