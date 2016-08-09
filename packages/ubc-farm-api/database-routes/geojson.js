import {badData} from 'boom';
import {Field} from '../../ubc-farm-database';
import {
	Feature,
	FeatureCollection
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

function featureToField(feature) {
	const {id, properties, geometry} = feature;
	if (geometry.type !== 'Polygon') 
		throw badData(`Geometry type must be Polygon, cannot be ${geometry.type}`);
	
	const path = geometry.coordinates, {parent, grid} = properties || {};
	
	let field = {path, parent};
	if (id) field.id = id;
	if (grid) {
		field.gridWidths = [grid.baseWidth, ...grid.specificWidths || []];
		field.gridHeights = [grid.baseHeight, ...grid.specificHeights || []];
	}	
	
	return field;
}

export function geojsonAdd(request, reply) {
	const {payload} = request;
	let insertQuery = [];

	switch (payload.type) {
		case 'FeatureCollection': {
			for (const feature of payload.features) {
				try {
					insertQuery.push(featureToField(feature));
				} catch (err) {
					if (err.isBoom && err.output.statusCode === 422)
						return reply(err);
					else throw err;
				}
			}
			break;
		}
		case 'Feature': 
			try {
				insertQuery[0] = featureToField(payload);
				break;
			} catch (err) {
				if (err.isBoom && err.output.statusCode === 422)
					return reply(err);
				else throw err;
			}
		case 'Polygon': {
			const path = payload.coordinates;
			insertQuery[0] = {path};
			break;
		}
		default: return reply(badData(
			'GeoJSON Type must be a FeatureCollection, Feature, or Polygon;' 
			+ ` it cannot be ${payload.type}`
		)); 
	}

	const query = Field.query.insert(insertQuery)
		.then(inserted => ({ id: inserted[Field.idColumn] }));

	return transformReply(query, request, reply);
}

export default [
	{
		method: 'GET',
		path: '/api/fields/geojson',
		handler: geojson
	},
	{
		method: 'POST',
		path: '/api/fields/geojson',
		handler: geojsonAdd
	},
]
