import users from './users.js';

function setupRoutes(app) {
	app.use('/api/v1', users());
}

export default setupRoutes;
