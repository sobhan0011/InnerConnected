import express from 'express';
import { makeInvoker } from 'awilix-express';
import { getChatMessages } from './chatValidators.js';
import { validate } from '../common/middlewares/validator.js';
import { authentication } from '../common/middlewares/authentication.js';

function chatRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.chatController;
	});

	router.get('/chats/:chatId/messages', validate(getChatMessages, 'params'), authentication, api('getChatMessages'));
	return router;
}

export default chatRouter;
