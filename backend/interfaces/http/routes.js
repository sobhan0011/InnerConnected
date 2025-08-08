import users from './user/userRoutes.js';
import posts from './post/postRoutes.js';
import comments from './comment/commentRoutes.js';
import auth from './auth/authRoutes.js';
import chats from './chat/chatRoutes.js';

function setupRoutes(app) {
	app.use('/api/v1', auth());
	app.use('/api/v1', users());
	app.use('/api/v1', posts());
	app.use('/api/v1', comments());
	app.use('/api/v1', chats());
}

export default setupRoutes;
