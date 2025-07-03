import { createContainer, asClass, asValue } from 'awilix';

import UserController from './controllers/userController.js';
import UserRepository from './src/domain/user/userRepository.js';
import UserUsecaseRegistry from './src/application/user/userUsecaseRegistry.js';

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

	userUsecaseRegistry: asClass(UserUsecaseRegistry).scoped(),

	userController: asClass(UserController).scoped(),
});

export default container;
