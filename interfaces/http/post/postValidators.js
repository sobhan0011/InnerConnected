import Joi from 'joi';

export const createPostSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	content: Joi.string().min(10).required(),
	createdDate: Joi.date().optional(),
	approved: Joi.boolean().optional(),
	userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const postIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
