import jsts from 'jsts';
import { offset } from 'geo/spherical.js';
import * as Angle from 'geo/angle.js';
const {geom: {Polygon, GeometryFactory}} = jsts;

/**
 * Creates a clockwise path from the start
 * point of the cell. 
 * @returns {Coordinate[]} 
 */
function buildPath(start, width, height, parallel, perpendicular) {
	//Build path clockwise
	let north = offset(start, height, perpendicular); //Draw up
	let point2 = offset(north, width, parallel); //Draw right
	let east = offset(point2, height, perpendicular * -1);//Draw down
	
	return [start, north, point2, east]//, start];
}

export default class GridCell extends Polygon {
	/**
	 * @param {Coordinate} start
	 * @param {number} width of cell
	 * @param {number} height of cell
	 * @param {number} angle of baseline, in degrees
	 */
	constructor(start, width, height, angle) {
		let perpendicular = Angle.toDegrees(Angle.normalize(
				Angle.toRadians(angle) - (Angle.PI_OVER_2 * -1) ));
		
		let path = buildPath(start, width, height, angle, perpendicular);

		/** Initiate geom.Polygon */
		let factory = new GeometryFactory();
		super(factory.createLinearRing(path), [], factory);
		
		this.start = start;
		this.width = width;
		this.height = height;
		this.parallel = angle;
		this.perpendicular = perpendicular;
		this.path = path;
		this.weak = null;
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