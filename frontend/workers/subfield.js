import register from './promise/register.js';
import {geom} from 'jsts';
import {convertPolygon as convertCell} from 'geo/converter.js';

/**
 * Generator function that wraps union from JSTS. Each value passed to the 
 * generator is united with the previous result.  
 * @param {GeometryFactory} factory to build blank geometry with
 * @returns {Generator}
 * @yields {Geometry} the complete geometry
 */
function* uniter(factory = new geom.GeometryFactory()) {
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
 * Unites all the given paths into a large polygon
 * @param {Array<Coordinate[]>} cells array
 * @param {Coordinate[]} cells[] - the path of a cell
 * @returns {Promise<Array<Coordinate[]>>} the paths of the resulting polygon
 */
register(function(cells) {
	let co = uniter(factory); 
	co.next() //first next call starts up the generator (runs to first yield)
	
	for (let cell of cells) co.next(convertCell(cell));
	return co.return().value;
});