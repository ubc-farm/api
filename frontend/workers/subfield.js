import register from './promise/register.js';
import {geom, io} from 'jsts';

const factory = new geom.GeometryFactory();
const reader = new io.GeoJSONReader(factory);
const writer = reader.parser;

/**
 * @module frontend/workers/subfield
 */

/**
 * Generator function that wraps union from JSTS. Each value passed to the 
 * generator is united with the previous result.  
 * @param {GeometryFactory} factory to build blank geometry with
 * @returns {Generator}
 * @yields {Geometry} the complete geometry
 */
export default function* uniter(factory = new geom.GeometryFactory()) {
	let creation = new geom.Geometry(factory);
	try {
		while (true) {
			let input = yield creation;
			creation.union(input);
		}
	} finally {
		// Because this is within a try/finally block, uniter.return() will return
		// this value instead of whatever is passed into return.
		return creation;
	}
}

/** 
 * Unites all the given polygons into a large polygon
 * @param {Object} msg
 * @param {GeoJSON.Polygon[]} msg.cells - array of cells
 * @returns {Promise<GeoJSON.Polygon>} the resulting polygon
 */
register(function({cells}) {
	const co = uniter(factory); 
	co.next() //first next call starts up the generator (runs to first yield)
	
	for (let cell of cells) co.next(reader.read(cell));
	return writer.write(co.return().value);
});