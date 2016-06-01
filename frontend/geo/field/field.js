import jsts from 'jsts';

export default class Field extends jsts.geom.Polygon {
	/**
	 * @param {Coordinate[]} path
	 * @param {string} name
	 * @param {Grid} grid
	 */
	constructor(path, name = '', grid) {
		this.name = name;
		this.grid = grid;
		
		let factory = new jsts.geom.GeometryFactory();
		super(factory.createLinearRing(path), [], factory);
		
		this.grid.setAlignment([path[0], path[1]]);
		this.grid.container = this;	
	}
}