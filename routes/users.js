import express from 'express';
import container from '../di.js';

function usersRouter() {
	const router = express.Router();
	const userController = container.resolve('userController');

	router.get('/users/', userController.getUsers);
	router.get('/users/:id', userController.getUserById);
	router.post('/users/', userController.addUser);
	router.delete('/users/:id', userController.deleteUser);
	router.put('/users/:id', userController.updateUser);

	return router;
}

export default usersRouter;
