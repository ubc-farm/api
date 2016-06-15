import register from './promise/register.js';
import {geom} from 'jsts';
import {convertPolygon as convertCell} from 'geo/converter.js';

/**
 * Generator function that wraps union from JSTS. 
 * Each value passed to the generator is united with
 * the previous result. 
 * @param {GeometryFactory} factory to build blank geometry with
 * @returns {Generator}
 * @yields {Geometry} the complete geometry
 */
function* unite(factory = new geom.GeometryFactory()) {
	let creation = new geom.Geometry(factory);
	yield null;
	while (true) {
		let input = yield creation;
		if (input === false) break;
		creation.union(input);
	}
	return creation;
}

/** 
 * Unites all the given paths into a large polygon
 * @param {Array<Coordinate[]>} cells array
 * @param {Coordinate[]} cells[] - the path of a cell
 * @returns {Promise<Array<Coordinate[]>>} the paths of the resulting polygon
 */
register(function(cells) {
	let factory = new geom.GeometryFactory();
	let uniter = unite(factory); uniter.next();
	for (let cell of cells) uniter.next(cell);
	return uniter.next(false).value;
});