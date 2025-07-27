import http from 'http';
import App from './app.js';
import container from './di.js';
import { createSocketServer } from './socketServer.js';

const start = async () => {
	const app = new App();
	app.setup(container);
	const server = http.createServer(app.app);

	createSocketServer(server, container);

	server.listen(app.PORT, () => {
		console.log(`Server running on http://localhost:${app.PORT}`);
	});

	process.on('SIGINT', shutdown(server, container));
	process.on('SIGTERM', shutdown(server, container));
};

const shutdown = (server, container) => {
	return async () => {
		console.log('\n🛑 Shutting down gracefully...');
		await new Promise((resolve) => {
			return server.close(resolve);
		});
		await container.dispose();
		process.exit(0);
	};
};

start().catch((err) => {
	console.error('❌ App failed to start:', err);
	process.exit(1);
});
