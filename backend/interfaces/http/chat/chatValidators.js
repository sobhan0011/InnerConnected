import Joi from 'joi';

export const getChatMessages = Joi.object({
	chatId: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
