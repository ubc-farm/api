import Position from './position.js';
import Geometry from './geometry.js';

/**
 * A string of positions that forms a line
 */
export default class LineString extends Geometry {
	static get type() {return 'LineString';}

	/** @param {...Position} positions */
	constructor(...positions) {
		super();
		/** @type {Position[]} */
		this.coordinates = positions.map(pos => Position.from(pos));
	}

	static from(value) {
		if (value instanceof LineString) return value;
		else return new LineString(value);
	}
}