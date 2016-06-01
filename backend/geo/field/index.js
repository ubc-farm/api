const {geom} = require('jsts');

module.exports = class Field extends geom.Polygon {
	/**
	 * @param {Coordinate[]} path
	 * @param {string} name
	 * @param {Grid} grid
	 */
	constructor(path, name = '', grid) {
		let factory = new geom.GeometryFactory();
		super(factory.createLinearRing(path), [], factory);
		
		this.name = name;
		this.grid = grid;
		
		if (this.grid) {
			this.grid.setAlignment([path[0], path[1]]);
			this.grid.container = this;	
		}
	}
}