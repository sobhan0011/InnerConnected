import express from 'express';
import { makeInvoker } from 'awilix-express';
import {
	createUserSchema,
	getUsersFilterSchema,
	updateUserSchema,
	userIdParamSchema,
	updateMyAccountSchema,
} from './userValidators.js';
import { validate } from '../common/middlewares/validator.js';
import { authentication } from '../common/middlewares/authentication.js';
import { authorization } from '../common/middlewares/authorization.js';
import UserRoles from '../../../src/domain/user/userRoles.js';
import { upload } from '../common/middlewares/upload.js';

function usersRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.userController;
	});

	router.get('/users/me', authentication, api('getUserById'));
	router.patch('/users/me', validate(updateMyAccountSchema, 'body'), authentication, api('updateUser'));
	router.delete('/users/me', authentication, api('deleteUser'));
	router.post('/users/me/upload-image', authentication, upload, api('uploadProfileImage'));

	router.get('/users/', validate(getUsersFilterSchema, 'query'), authentication, api('getUsers'));

	router.get('/users/chats', authentication, api('getUserChats'));

	router.get(
		'/users/:id',
		validate(userIdParamSchema, 'params'),
		authentication,
		authorization([UserRoles.ADMIN]),
		api('getUserById'),
	);

	router.post('/users/', validate(createUserSchema, 'body'), authentication, authorization([UserRoles.ADMIN]), api('addUser'));

	router.delete(
		'/users/:id',
		validate(userIdParamSchema, 'params'),
		authentication,
		authorization([UserRoles.ADMIN]),
		api('deleteUser'),
	);

	router.patch(
		'/users/:id',
		validate(userIdParamSchema, 'params'),
		validate(updateUserSchema, 'body'),
		authentication,
		authorization([UserRoles.ADMIN]),
		api('updateUser'),
	);

	return router;
}

export default usersRouter;
