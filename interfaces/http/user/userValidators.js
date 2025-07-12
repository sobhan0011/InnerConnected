import Joi from 'joi';

const nameRegex = /^[\p{L}\s]+$/u;

export const createUserSchema = Joi.object({
	firstName: Joi.string().pattern(nameRegex).min(1).max(50).required().messages({
		'string.pattern.base': 'First name can only contain letters and spaces (any language).',
	}),
	lastName: Joi.string().pattern(nameRegex).min(1).max(50).required().messages({
		'string.pattern.base': 'Last name can only contain letters and spaces (any language).',
	}),
	username: Joi.string().alphanum().min(3).max(30).required(),
	phoneNumber: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.required()
		.messages({
			'string.pattern.base': 'Phone number must be 10 to 15 digits.',
		}),
	password: Joi.string()
		.min(8)
		.max(128)
		.pattern(/[a-z]/, 'lowercase')
		.pattern(/[A-Z]/, 'uppercase')
		.pattern(/[0-9]/, 'number')
		.pattern(/[^a-zA-Z0-9]/, 'special')
		.required()
		.messages({
			'string.pattern.name': 'Password must include at least one {#name} character.',
		}),
	email: Joi.string().email().required(),
});

export const updateUserSchema = Joi.object({
	firstName: Joi.string().pattern(nameRegex).min(1).max(50).optional().messages({
		'string.pattern.base': 'First name can only contain letters and spaces (any language).',
	}),
	lastName: Joi.string().pattern(nameRegex).min(1).max(50).optional().messages({
		'string.pattern.base': 'Last name can only contain letters and spaces (any language).',
	}),
	username: Joi.string().alphanum().min(3).max(30).optional(),
	phoneNumber: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.optional()
		.messages({
			'string.pattern.base': 'Phone number must be 10 to 15 digits.',
		}),
});

export const userIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
