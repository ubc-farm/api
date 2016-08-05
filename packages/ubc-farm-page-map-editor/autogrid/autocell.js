import {geom, algorithm} from '../../jsts/index.js';
import {computeOffset as offset} from 'spherical-geometry-js';

const {toDegrees, toRadians, normalize: normalizeAngle} = algorithm.Angle;
const {PI_OVER_2} = algorithm.Angle;

/**
 * Self-building cell of an AutoGrid
 * Creates a path from the given starting point and dimensions
 * @extends {jsts.geom.Polygon}
 */
export default class AutoGridCell extends geom.Polygon {
	/**
	 * @param {jsts.geom.Coordinate} start
	 * @param {number} width of cell
	 * @param {number} height of cell
	 * @param {number} angle of baseline, in degrees
	 */
	constructor(start, width, height, angle) {
		if (!start || width == null || height == null || angle == null)
			throw TypeError('Missing paramaters in constructor');
		const perpendicular = toDegrees(normalizeAngle(
			toRadians(angle) - (PI_OVER_2 * -1) 
		));
		const path = AutoGridCell.build(start, width, height, angle, perpendicular);

		AutoGridCell.init();
		super(AutoGridCell.factory.createLinearRing(path), [], AutoGridCell.factory)
		Object.assign(this, {start, width, height, parallel: angle, perpendicular});
		
		this.north = path[1];
		this.west = path[3];
	}

	get east() {
		return offset(this.start, this.width, (this.parallel + 180) % 360);
	}
	
	get south() {
		return offset(this.start, this.height, (this.perpendicular + 180) % 360);
	}

	/**
	 * Initializes the geometry factory for creating cells. A factory can be
	 * passed before creating grid cell instances so it is used instead.
	 * @param {jsts.geom.GeometryFactory}
	 */
	static init(factory) {
		AutoGridCell.factory = factory || AutoGridCell.factory 
			|| new geom.GeometryFactory();
	}

	/**
	 * Creates a clockwise path from the start
	 * point of the cell. 
	 * @returns {jsts.geom.Coordinate[]} 
	 */
	static build(startPoint, width, height, parallel, perpendicular) {
		//Build path clockwise
		const north = offset(startPoint, height, perpendicular); //Draw up
		const point2 = offset(north, width, parallel); //Draw right
		const west = offset(point2, height, (perpendicular + 180) % 360);//Draw down
		return [startPoint, north, point2, west, startPoint];
	}
	
	/**
	 * Weakens the cell because it partially lies outside the container.
	 * The weak property can be used to get a partial cell that fits properly
	 * as the extra portion is chopped off.
	 * @param {jsts.geom.Polygon} container
	 * @returns {jsts.geom.Polygon} smaller cell
	 */
	weaken(container) {
		if (!container.getGeometryType) 
			throw Error('container must be a JSTS geometry');
		return this.intersection(container);
	}
}