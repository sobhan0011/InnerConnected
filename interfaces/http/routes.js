import users from './user/userRoutes.js';
import posts from './post/postRoutes.js';
import comments from './comment/commentRoutes.js';

function setupRoutes(app) {
	app.use('/api/v1', users());
	app.use('/api/v1', posts());
	app.use('/api/v1', comments());
}

export default setupRoutes;
