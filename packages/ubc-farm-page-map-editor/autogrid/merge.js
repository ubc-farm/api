import {geom} from '../../jsts/index.js';

/**
 * Coroutine function that wraps union from JSTS. Each value passed to the 
 * generator is united with the previous result.  
 * @param {GeometryFactory} factory to build blank geometry with
 * @returns {Generator}
 * @yields {Geometry} the complete geometry
 */
export default function* merge(factory) {
	if (!factory) throw TypeError('merge needs a GeometryFactory to start')
	const creation = new geom.Geometry(factory);
	try {while (true) {
		const input = yield creation;
		creation.union(input);
	}} finally {
		return creation;
	}
}