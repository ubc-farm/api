const {offset} = require('../spherical.js');
//const Angle = require('../latlng/angle.js');
const {geom: {Polygon, GeometryFactory}, algorithm: {Angle}} = require('jsts');

module.exports = class GridCell extends Polygon {
	/**
	 * @param {Coordinate} start
	 * @param {number} width of cell
	 * @param {number} height of cell
	 * @param {number} angle of baseline, in degrees
	 */
	constructor(start, width, height, angle) {
		this.start = start;
		this.width = width;
		this.height = height;
		this.parallel = angle;
		this.perpendicular = Angle.toDegrees(Angle.normalize(
				Angle.toRadians(angle) - (Angle.PI_OVER_2 * -1) ));
		this.weak = null;
		
		/** Initiate geom.Polygon */
		let factory = new GeometryFactory();
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
	
	weaken(container) {
		this.weak = this.intersection(container);
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