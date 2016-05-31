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
		super(factory.createLinearRing(
			buildPath().map(p => new geom.Coordinate(p.x, p.y))
		), [], factory);
	}
	
	/**
	 * Returns/creates a clockwise path from the start
	 * point of the cell. 
	 * @returns {LatLng[]} 
	 */
	buildPath() {
		if (this._path) return this._path;
		//Build path clockwise
		let point1 = offset(this.start, this.height, this.perpendicular);
		let point2 = offset(point1, this.width, this.parallel);
		let point3 = offset(point2, this.height, this.perpendicular * -1);
		
		this._path = [this.start, point1, point2, point3];
		return this._path;
	}
	
	//intersects(parent)
}