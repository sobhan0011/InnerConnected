import { createContainer, asClass, asValue } from 'awilix';

// Configs
import serverConfig from './configs/serverConfig.js';
import postgresConfig from './configs/moduleConfigs/postgresConfig.js';

//Controllers
import UserController from './interfaces/http/user/userController.js';
import PostController from './interfaces/http/post/postController.js';
import CommentController from './interfaces/http/comment/commentController.js';
import AuthController from './interfaces/http/auth/authController.js';

// UsecaseRegistries
import UserUsecaseRegistry from './src/application/user/usecases/userUsecaseRegistry.js';
import PostUsecaseRegistry from './src/application/post/usecases/postUsecaseRegistry.js';
import CommentUsecaseRegistry from './src/application/comment/usecases/commentUsecaseRegistry.js';
import ChatUsecaseRegistry from './src/application/chat/usecases/chatUsecaseRegistry.js';

// 3rd party
import Postgres from './src/infrastructure/db/postgres/postqres.js';

// POSTQRES
import postgresUserRepository from './src/infrastructure/db/postgres/repositories/postgresUserRepository.js';
import postgresPostRepository from './src/infrastructure/db/postgres/repositories/postgresPostRepository.js';
import postgresCommentRepository from './src/infrastructure/db/postgres/repositories/postgresCommentRepository.js';
import postgresChatRepository from './src/infrastructure/db/postgres/repositories/postgresChatRepository.js';

const container = createContainer();

// configs
container.register({
	serverConfig: asValue(serverConfig),
	postgresConfig: asValue(postgresConfig),
});

// 3rd party
container.register({
	logger: asValue(console),
	db: asClass(Postgres)
		.singleton()
		.disposer((db) => {
			return db.disconnect();
		}),
});

//Controllers
container.register({
	authController: asClass(AuthController).scoped(),
	userController: asClass(UserController).scoped(),
	postController: asClass(PostController).scoped(),
	commentController: asClass(CommentController).scoped(),
});

// UsecaseRegistries
container.register({
	userUsecaseRegistry: asClass(UserUsecaseRegistry).scoped(),
	postUsecaseRegistry: asClass(PostUsecaseRegistry).scoped(),
	commentUsecaseRegistry: asClass(CommentUsecaseRegistry).scoped(),
	chatUsecaseRegistry: asClass(ChatUsecaseRegistry).scoped(),
});

// Repositories
container.register({
	userRepository: asClass(postgresUserRepository).scoped(),
	postRepository: asClass(postgresPostRepository).scoped(),
	commentRepository: asClass(postgresCommentRepository).scoped(),
	chatRepository: asClass(postgresChatRepository).scoped(),
});

export default container;
