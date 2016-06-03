import jsts from 'jsts';

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