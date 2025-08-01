import Joi from 'joi';

const content = Joi.string().min(10).messages({
	'string.min': 'Content must be at least 10 characters long.',
});

const userId = Joi.string().uuid({ version: 'uuidv4' });

export const createPostSchema = Joi.object({
	content: content.required(),
	userId: userId.optional(),
});

export const updatePostSchema = Joi.object({
	content: content.optional(),
	userId: userId.optional(),
})
	.min(1)
	.messages({
		'object.min': 'At least one field must be provided.',
	});

export const postIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getPostsFilterSchema = Joi.object({
	content: content.optional(),
	userId: userId.optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
	includeUser: Joi.boolean(),
});
