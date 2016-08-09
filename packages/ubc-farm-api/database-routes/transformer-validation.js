import Joi from 'joi';

export const print = Joi.string().valid('silent', 'pretty');

export const shallow = Joi.boolean();