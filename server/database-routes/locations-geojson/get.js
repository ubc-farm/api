import * as Joi from 'joi';
import { Feature, FeatureCollection } from 'ubc-farm-utils/class/geojson/index.js';
import { Location } from '../../../database/index.js';
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
			const point = {
				type: 'Point',
				coordinates: coord,
			};

			list.push(new Feature(point, { name }, id));
		}

		return new FeatureCollection(list).toJSON();
	});

	return transformReply(query, request, reply);
}

export default {
	method: 'GET',
	path: '/api/locations/geojson',
	handler: getLocationsGeojson,
};
