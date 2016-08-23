import * as Joi from 'joi';

const position = Joi.array().min(2).items(Joi.number());
const ring = Joi.array().min(3).items(position);
export const coordinates = Joi.array().min(1).items(ring);

export const geometry = Joi.object({
	type: Joi.string().valid('Polygon').required(),
	coordinates,
});

const parent = Joi.string().empty(null);
const grid = Joi.object({
	baseWidth: Joi.number().required(),
	baseHeight: Joi.number().required(),
	specificWidths: Joi.array().items(Joi.number()).optional(),
	specificHeights: Joi.array().items(Joi.number()).optional(),
});

export const properties = Joi.object({ parent, grid })
	.optionalKeys('parent', 'grid').unknown();

const feature = Joi.object({
	type: Joi.string().valid('Feature').required(),
	geometry,
	properties,
}).optionalKeys('geometry', 'properties');

export const features = Joi.array().items(feature);
