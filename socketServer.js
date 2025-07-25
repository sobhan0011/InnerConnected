import { Server } from 'socket.io';
import createChatGateway from './interfaces/socket/chatGateway.js';
import { authentication } from './interfaces/socket/authentication.js';

export function createSocketServer(httpServer, container) {
	const io = new Server(httpServer, {
		cors: { origin: '*' },
	});
	io.use(authentication);
	createChatGateway(io, { chatUsecaseRegistry: container.resolve('chatUsecaseRegistry') });
	return io;
}
