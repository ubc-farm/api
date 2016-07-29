import { 
	version, 
	densify, dissolve, geom, geomgraph, 
	index, io, noding, operation, 
	precision, simplify, triangulate,
	algorithm as _algorithm
} from './jsts.es6.js';

import * as Angle from './angle.js';
//Add Angle to algorithm
const algorithm = Object.assign({}, _algorithm, {Angle});
Object.freeze(algorithm);

export { version, algorithm, densify, dissolve, geom, geomgraph, index, io, noding, operation, precision, simplify, triangulate }