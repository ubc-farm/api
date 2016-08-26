import * as Joi from 'joi';
import { Location } from '../../../database/index.js';
import { Feature, FeatureCollection } from '../../../utils/geojson.js';
import { transformReply } from '../transformer.js';

/**
 * Retrieve fields as a GeoJSON Feature Collection
 */
function getLocationsGeojson(request, reply) {
	const query = Location.query()
	.then(results => {
		const list = [];
		for (const field of results) {
			if (!field.position) continue;

			const { coord, id, name } = field;

			list.push(new Feature(coord, { name }, id));
		}

		return new FeatureCollection(list).toJSON();
	});

	return transformReply(query, request, reply);
}
