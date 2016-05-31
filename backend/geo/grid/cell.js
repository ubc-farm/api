const {offset} = require('../latlng/spherical.js');
const Angle = require('../latlng/angle.js');
const {geom} = require('jsts');

module.exports = class GridCell extends geom.Polygon {
	constructor(start, width, height, angle) {
		this.start = new geom.Coordinate(start.x, start.y);
		this.width = width;
		this.height = height;
		this.parallel = Angle.parse(angle);
		this.perpendicular = Angle.rotate(this.parallel, -90);
		
		/** Initiate geom.Polygon */
		let factory = new geom.GeometryFactory();
		super(factory.createLinearRing(buildPath()), [], factory);
	}
	
	/**
	 * Returns/creates a clockwise path from the start
	 * point of the cell. 
	 * @returns {Coordinate[]} 
	 */
	buildPath() {
		if (this._path) return this._path;
		//Build path clockwise
		this.north = offset(this.start, this.height, this.perpendicular); //Draw up
		let point2 = offset(this.north, this.width, this.parallel); //Draw right
		this.east = offset(point2, this.height, this.perpendicular * -1);//down
		
		this._path = [this.start, this.north, point2, this.east, this.start];
		return this._path;
	}
	
	get west() {
		if (!this._west) 
			this._west = offset(this.start, this.width, this.parallel * -1);
		return this._west;
	}
	
	get south() {
		if (!this._south) 
			this._south = offset(this.start, this.height, this.perpendicular * -1);
		return this._south;
	}
	
	//intersects(parent)
}