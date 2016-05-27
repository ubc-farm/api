import google from 'google/maps/edit';

/**
 * Returns a endpoint from the start to the edge of the container
 * @param {LatLng} start position
 * @param {number} heading
 * @param {Polygon} container - polygon to stay within
 * @param {number} [rate=1] - how often to check that the line is within the container
 */
export function growLine(start, heading, container, rate = 1.0) {
	let complete = false, distance = rate, end;
	while (!complete) {
		end = google.maps.geometry.spherical
			.completeOffset(start, distance, heading);
		if (google.maps.geometry.poly.containsLocation(end, container)) {
			complete = true;
		}
	}
	return end;
}

/** Converts angle (0 to 360) to heading (-180 to 180) */
export function angleToHeading(angle) {
	angle = angle % 360;
	if (angle <= 180) return angle;
	else return angle - 360;
}

/** Converts heading (-180 to 180) to angle (0 to 360) */
export function headingToAngle(heading) {
	if (heading >= 0) return heading;
	else return heading + 360; 
}

/**
 * Checks if path is clockwise or counterclockwise
 * @param {LatLngLiteral[]} path
 * @returns {boolean} true if clockwise, false if counterclockwise
 * @see http://stackoverflow.com/questions/1165647
 */
export function clockwisePath(path) {
	if (path instanceof google.maps.MVCArray) path = path.getArray();
	let sum = 0, length = path.length;
	
	for (let i = 0; i < length; i++) {
		let [index, next] = [i, i+1].map(v => v % length);
		let [point1, point2] = [path[index], path[next]].map(value => {
			if (value instanceof google.maps.LatLng) {
				return value.toJSON();
			}
		});
		
		sum += (point2.lng - point1.lng) * (point2.lat + point1.lat);
	}
	
	return (sum > 0);
}

export class Grid {
	
	/**
	 * @param {Field} field
	 * @param {number} rowSize
	 * @param {number} columnSize
	 */
	constructor(field, rowsize, columnsize) {
		this.container = field.polygon;
		this.field = field;
		this.clockwise = clockwisePath(this.container.getPath().getArray());
		this.baseline = field.getLine(0);
		this.edgeIndex = 0;
		this.rowSize = rowsize;
		this.columnSize = columnsize;
	}
	
	/**
	 * Gets a heading perpendicular to the baseline
	 */
	perpendicularHeading() {
		let baseHeading = google.maps.geometry.spherical
			.computeHeading(this.baseline.getAt(0), this.baseline.getAt(1));
		let angleShift = this.clockwise? 90 : -90;
		
		return angleToHeading(headingToAngle(baseHeading) + angleShift);
	}
	
	/**
	 * Create lines perpendicular to the baseline, stemming from it
	 * @param {number} distance in meters between columns
	 * @returns {MVCArray<LatLng>}
	 */
	buildColumns(distance = 1) {
		let [start, end] = this.baseline.getArray();
		let length = google.maps.geometry.spherical
			.computeDistanceBetween(start, end);
	}
}