import express from 'express';
import { makeInvoker } from 'awilix-express';
import { userLoginSchema, userSignupSchema } from './authValidators.js';
import { validate } from '../common/middlewares/validator.js';

function authRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.authController;
	});

	router.post('/auth/signup', validate(userSignupSchema, 'body'), api('userSignup'));
	router.post('/auth/login', validate(userLoginSchema, 'body'), api('userLogin'));
	return router;
}

export default authRouter;
