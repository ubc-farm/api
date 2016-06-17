import Geometry from './geometry.js';
import LineString from './linestring.js';

/**
 * Polygon coordinates contains LineStrings where the last point is equal to
 * the first point. If multiple lines are specified, the first will be the
 * exterior ring and the others will be holes in the polygon.
 */
export default class Polygon extends Geometry {
	get type() {return 'Polygon';}

	/** @param {...LineString} lines */
	constructor(...lines) {
		super();
		/** @type {Position[][]} */
		this.coordinates = lines.map(line => new LineString(line).coordinates);
	}

	/** Converts value to a Polygon */
	static from(value) {
		if (value instanceof Polygon) return value;
		else if (Array.isArray(value)) {
			return new Polygon(value);
		}
		else if (value.type && value.type == 'Polygon') {
			return new Polygon(value.coordinates);
		} 
	}
}