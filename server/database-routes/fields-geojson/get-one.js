import { notFound } from 'boom';
import { Feature } from 'ubc-farm-utils/class/geojson/index.js';
import { Field } from '../../../database/index.js';
import { transformReply } from '../transformer.js';

/**
 * Retrieve a single field as a GeoJSON Feature
 */
function geojsonSingleFeature(request, reply) {
	const { id } = request.params;

	const query = Field.query().findById(id)
		.then(field => {
			if (field === undefined) return notFound();
			else if (!field.path) return notFound('No path exists for field');

			const { parent, grid } = field;
			return new Feature(field.polygon, { parent, grid }, field.$id);
		});

	return transformReply(query, request, reply);
}

export default {
	method: 'GET',
	path: '/api/fields/geojson/{id}',
	handler: geojsonSingleFeature,
};
