import * as Joi from 'joi';
import { Field } from '../../../database/index.js';
import { transformReply } from '../transformer.js';
import { print, shallow } from '../transformer-validation.js';
import * as valid from './validation.js';

function featureToField(feature) {
	const { id, properties = {}, geometry: { coordinates } } = feature;
	const { parent, grid } = properties;

	const field = {};

	if (coordinates) field.path = coordinates;

	if (parent) field.parent = parent;

	if (id) {
		const idVal = Number(id);
		if (!Number.isNaN(idVal)) field.id = idVal;
	}

	if (grid) {
		field.gridWidths = [grid.baseWidth, ...grid.specificWidths || []];
		field.gridHeights = [grid.baseHeight, ...grid.specificHeights || []];
	}

	return field;
}

export function geojsonAdd(request, reply) {
	const { payload } = request;
	const insertQuery = [];

	switch (payload.type) {
		case 'FeatureCollection': {
			for (const feature of payload.features) {
				insertQuery.push(featureToField(feature));
			}
			break;
		}
		case 'Feature':
			insertQuery[0] = featureToField(payload);
			break;
		case 'Polygon': {
			const path = payload.coordinates;
			insertQuery[0] = { path };
			break;
		}
		default:
			throw new Error(`Invalid type ${payload.type}`);
	}

	console.log(insertQuery[0]);

	const query = Field.query().insert(insertQuery)
		.then(inserted => ({ id: inserted[Field.idColumn] }));

	return transformReply(query, request, reply);
}

export default {
	method: 'POST',
	path: '/api/fields/geojson',
	handler: geojsonAdd,
	config: {
		validate: {
			payload: {
				type: Joi.string().only('Feature', 'FeatureCollection', 'Polygon'),
				coordinates: Joi.any().when('type', { is: 'Polygon',
					then: valid.coordinates,
					otherwise: Joi.any().forbidden(),
				}),
				geometry: Joi.any().when('type', { is: 'Feature',
					then: valid.geometry,
					otherwise: Joi.any().forbidden(),
				}),
				properties: Joi.any().when('type', { is: 'Feature',
					then: valid.properties,
					otherwise: Joi.any().forbidden(),
				}),
				id: Joi.any().when('type', { is: 'Feature',
					then: Joi.string(),
					otherwise: Joi.any().forbidden(),
				}),
				features: Joi.any().when('type', { is: 'FeatureCollection',
					then: valid.features,
					otherwise: Joi.any().forbidden(),
				}),
			},
			query: {
				print, shallow,
			},
		},
	},
};
