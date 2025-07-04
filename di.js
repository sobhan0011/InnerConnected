import { createContainer, asClass, asValue } from 'awilix';

import UserController from './interfaces/http/user/userController.js';
import PostController from './interfaces/http/post/postController.js';
import CommentController from './interfaces/http/comment/commentController.js';

import UserRepository from './src/domain/user/userRepository.js';
import UserUsecaseRegistry from './src/application/user/userUsecaseRegistry.js';

import PostRepository from './src/domain/post/postRepository.js';
import PostUsecaseRegistry from './src/application/post/postUsecaseRegistry.js';

import CommentRepository from './src/domain/comment/commentRepository.js';
import CommentUsecaseRegistry from './src/application/comment/commentUsecaseRegistry.js';

import serverConfig from './configs/serverConfig.js';

import Postgres from './src/infrastructure/db/postgres/postqres.js';
import postgresConfig from './configs/moduleConfigs/postgresConfig.js';

const container = createContainer();

container.register({
	serverConfig: asValue(serverConfig),
	postgresConfig: asValue(postgresConfig),

	db: asClass(Postgres)
		.singleton()
		.disposer((db) => {
			return db.disconnect();
		}),

	userRepository: asClass(UserRepository).scoped(),
	postRepository: asClass(PostRepository).scoped(),
	commentRepository: asClass(CommentRepository).scoped(),

	userUsecaseRegistry: asClass(UserUsecaseRegistry).scoped(),
	postUsecaseRegistry: asClass(PostUsecaseRegistry).scoped(),
	commentUsecaseRegistry: asClass(CommentUsecaseRegistry).scoped(),

	userController: asClass(UserController).scoped(),
	postController: asClass(PostController).scoped(),
	commentController: asClass(CommentController).scoped(),

	logger: asValue(console),
});

export default container;
