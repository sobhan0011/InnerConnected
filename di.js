import { createContainer, asClass, asValue } from 'awilix';

import serverConfig from './configs/serverConfig.js';

import UserController from './interfaces/http/user/userController.js';
import PostController from './interfaces/http/post/postController.js';
import CommentController from './interfaces/http/comment/commentController.js';

import UserUsecaseRegistry from './src/application/user/usecases/userUsecaseRegistry.js';
import PostUsecaseRegistry from './src/application/post/usecases/postUsecaseRegistry.js';
import CommentUsecaseRegistry from './src/application/comment/usecases/commentUsecaseRegistry.js';

import Postgres from './src/infrastructure/db/postgres/postqres.js';
import postgresConfig from './configs/moduleConfigs/postgresConfig.js';
import postgresUserRepository from './src/infrastructure/db/postgres/repositories/postgresUserRepository.js';
import postgresPostRepository from './src/infrastructure/db/postgres/repositories/postgresPostRepository.js';
import postgresCommentRepository from './src/infrastructure/db/postgres/repositories/postgresCommentRepository.js';

const container = createContainer();

container.register({
	serverConfig: asValue(serverConfig),

	userUsecaseRegistry: asClass(UserUsecaseRegistry).scoped(),
	postUsecaseRegistry: asClass(PostUsecaseRegistry).scoped(),
	commentUsecaseRegistry: asClass(CommentUsecaseRegistry).scoped(),

	userController: asClass(UserController).scoped(),
	postController: asClass(PostController).scoped(),
	commentController: asClass(CommentController).scoped(),

	logger: asValue(console),
});

container.register({
	postgresConfig: asValue(postgresConfig),

	db: asClass(Postgres)
		.singleton()
		.disposer((db) => {
			return db.disconnect();
		}),

	userRepository: asClass(postgresUserRepository).scoped(),
	postRepository: asClass(postgresPostRepository).scoped(),
	commentRepository: asClass(postgresCommentRepository).scoped(),
});

export default container;
