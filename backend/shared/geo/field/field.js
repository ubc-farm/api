import jsts from 'jsts';

/**
 * Represents a field of crops. This will either be extended with more 
 * functionality, or the logic will just be moved into the script that
 * calls this (currently the grid.js web worker) 
 * @depecated, use ../converter.js instead
 * @module geo/field/field.js
 */
export default class Field extends jsts.geom.Polygon {
	/**
	 * @param {Coordinate[]} path
	 * @param {string} name
	 * @param {Grid} grid
	 */
	constructor(path, name = '') {
		let factory = new jsts.geom.GeometryFactory();
		super(factory.createLinearRing(path), [], factory);
		
		this.name = name;
	}
}