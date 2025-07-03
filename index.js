import App from './app.js';
import container from './di.js';

const start = async () => {
	const db = container.resolve('db');
	await db.initialize();

	const app = new App();
	app.setup(container);
	app.run();
	process.on('SIGINT', shutdown(app, container));
	process.on('SIGTERM', shutdown(app, container));
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
