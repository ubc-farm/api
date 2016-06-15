import jsts from 'jsts';
import { offset } from '../spherical.js';
import * as Angle from '../angle.js';
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
	let west = offset(point2, height, (perpendicular + 180) % 360);//Draw down
	
	return [start, north, point2, west, start];
}

/**
 * Represents a square cell of a grid.
 * @module geo/grid/cell.js
 */
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
		this.weak = null;
		
		this.north = path[1];
		this.west = path[3];
	}
	
	/**
	 * Weakens the cell because it partially lies outside the container.
	 * The weak property can be used to get a partial cell that fits properly
	 * as the extra portion is chopped off.
	 * @returns {Polygon} smaller cell
	 */
	weaken(container) {
		this.weak = this.intersection(container);
		return this.weak;
	}
	
	get east() {
		if (!this._east) 
			this._east = offset(this.start, this.width, (this.parallel + 180) % 360);
		return this._east;
	}
	
	get south() {
		if (!this._south) 
			this._south = offset(this.start, this.height, 
				(this.perpendicular + 180) % 360);
		return this._south;
	}
}