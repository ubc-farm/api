import {Field} from '../../ubc-farm-database';
import {
	Feature,
	FeatureCollection,
	Polygon
} from '../../ubc-farm-utils/class/geojson/index.js';
import {transformReply} from './transformer.js';

/**
 * Retrieve fields as a GeoJSON Feature Collection
 */
export function geojson(request, reply) {
	const query = Field.query()
		.map(({polygon, parent, grid, $id}) => 
			new Feature(polygon, {parent, grid}, $id()))
		.then(features => new FeatureCollection(features))

	return transformReply(query, request, reply);
}

export function geojsonPost(request, reply) {
	const feature = new Feature(request.payload);
	feature.geometry = Polygon.from(feature.geometry);

	const field = {
		path: feature.geometry.coordinates,
		gridWidths: [feature.grid.width],
		gridHeights: [feature.grid.height],
		parent: feature.parent
	};

	const query = Field.query.insert([field])
		.then(inserted => ({ id: inserted[Field.idColumn] }));

	return transformReply(query, request, reply);
}

export default {
	method: 'GET',
	path: '/api/fields/geojson',
	handler: geojson
}
