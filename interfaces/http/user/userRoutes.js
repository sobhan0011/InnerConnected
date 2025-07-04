import express from 'express';
import { makeInvoker } from 'awilix-express';
import { createUserSchema, userIdParamSchema } from './userValidators.js';
import { validate } from '../common/middlewares/validator.js';

function usersRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.userController;
	});

	router.get('/users/', api('getUsers'));
	router.get('/users/:id', validate(userIdParamSchema, 'params'), api('getUserById'));
	router.post('/users/', validate(createUserSchema, 'body'), api('addUser'));
	router.delete('/users/:id', validate(userIdParamSchema, 'params'), api('deleteUser'));
	router.put('/users/:id', validate(userIdParamSchema, 'params'), validate(createUserSchema, 'body'), api('updateUser'));

	return router;
}

export default usersRouter;
