import * as Joi from 'joi';
import { Feature, FeatureCollection } from 'ubc-farm-utils/class/geojson/index.js';
import { Field } from '../../../database/index.js';
import { transformReply } from '../transformer.js';
import { geometry, properties } from './validation.js';

/**
 * Retrieve fields as a GeoJSON Feature Collection
 */
function geojson(request, reply) {
	const query = Field.query()
	.then(results => {
		const list = [];
		for (const field of results) {
			if (!field.path) continue;

			const { parent, grid } = field;

			list.push(new Feature(
				field.polygon,
				{ parent, grid },
				field.$id()
			));
		}

		return new FeatureCollection(list).toJSON();
	});

	return transformReply(query, request, reply);
}

export default {
	method: 'GET',
	path: '/api/fields/geojson',
	handler: geojson,
	config: {
		response: {
			schema: Joi.any()
				.when(Joi.ref('$query.shallow'), { is: false,
					then: Joi.object({
						type: Joi.string().valid('Feature').required(),
						geometry,
						properties,
					}).optionalKeys('geometry', 'properties'),
				}),
		},
	},
};
