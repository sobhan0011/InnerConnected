import Joi from 'joi';

const title = Joi.string().min(3).max(255).messages({
	'string.min': 'Title must be at least 3 characters long.',
	'string.max': 'Title must not exceed 255 characters.',
});

const content = Joi.string().min(10).messages({
	'string.min': 'Content must be at least 10 characters long.',
});

const approved = Joi.boolean();

const userId = Joi.string().uuid({ version: 'uuidv4' });

export const createPostSchema = Joi.object({
	title: title.required(),
	content: content.required(),
	approved: approved.optional(),
	userId: userId.optional(),
});

export const updatePostSchema = Joi.object({
	title: title.optional(),
	content: content.optional(),
	approved: approved.optional(),
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
	title: title.optional(),
	content: content.optional(),
	approved: approved.optional(),
	userId: userId.optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
});
