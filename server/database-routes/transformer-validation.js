import * as Joi from 'joi';

export const print = Joi.string().valid('silent', 'pretty');

export const shallow = Joi.boolean().allow('');

export const array = Joi.boolean().allow('');

export const clean = Joi.boolean().allow('');

export const validate = {
	query: Joi.object({
		print, 
		shallow,
		array,
		clean
	})
};