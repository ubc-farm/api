//import google from 'google/maps/edit';

const gridlineOptions = {
	geodesic: true,
	strokeColor: '#fff',
	strokeOpacity: 0.7,
	zIndex: 5,
	/*icons: [{
		icon: {
			path: 'M 0,-1 0,1',
			strokeOpacity: 0.7,
			scale: 4
		},
		offset: '0',
		repeat: '20px'
	}]*/
}

/** Modulo that handles negative numbers properly */
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
}

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
			.computeOffset(start, distance, heading);
		if (!google.maps.geometry.poly.containsLocation(end, container)) {
			complete = true;
		}
		distance += rate;
	}
	return end;
}

/** Finds the angle between two headings */
export function angleBetween(...headings) {
	let [angle1, angle2] = headings.map(headingToAngle);
	let smaller, larger;
	if (angle1 < angle2) {
		smaller = angle1;
		larger = angle2;
	} else {
		smaller = angle2;
		larger = angle1;
	}
	
	let between = Math.abs(larger - smaller);
	if (between > 180) { //Too obtuse
		between = (smaller + 360) - larger;
	}
	
	return between;
}

/** Converts angle (0 to 360) to heading (-180 to 180) */
export function angleToHeading(angle) {
	angle = angle.mod(360);
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
		let [index, next] = [i, i+1].map(v => v.mod(length));
		let [point1, point2] = [path[index], path[next]].map(value => {
			if (value instanceof google.maps.LatLng) {
				return value.toJSON();
			} else return value;
		});
		
		sum += (point2.lng - point1.lng) * (point2.lat + point1.lat);
	}
	
	return (sum > 0);
}

/**
 * @TODO
 * Finds the edge with the smallest angles
 * @param {LatLngLiteral[]} path
 */
export function bestBaseline(path) {
	if (path instanceof google.maps.MVCArray) path = path.getArray();
	let smallestAngle = Infinity, edge = -1;
	for (let i = 0; i < path.length; i++) {
		//Points
		let [prev, start, end, next] = [i - 1, i, i + 1, i + 2].map(v => {
			return new google.maps.LatLng(path[ v.mod(path.length) ])
		});
		//Headings of Lines
		let [ps, se, en] = [
			google.maps.geometry.spherical.computeHeading(prev, start),
			google.maps.geometry.spherical.computeHeading(start, end),
			google.maps.geometry.spherical.computeHeading(end, next)
		]
		
		let total = angleBetween(ps, se) + angleBetween(se, en);
		if (total < smallestAngle) {
			smallestAngle = total;
			edge = i;
		}
	}
	return edge;
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
		
		this.clockwise = clockwisePath(this.field.path);
		//this.edgeIndex = bestBaseline(this.field.path);
		//this.baseline = this.field.getLine(this.edgeIndex);
		this.baseline = this.field.getLine(0);
		this.edgeIndex = 0;
		
		this.rowSize = rowsize;
		this.columnSize = columnsize;
		this.rowValues = [];
		this.columnValues = [];
		
		this.gridPoints = new Set();
		this.buildColumns();
	}
	
	/**
	 * Creates bounds if they haven't already been set
	 */
	get bounds() {
		//const extendBy = 2;
		if (this.calculatedBounds) return this.calculatedBounds
		
		let bounds = new google.maps.LatLngBounds();
		this.container.getPath().forEach(point => {bounds.extend(point)});
		
		/*let northeast = google.maps.geometry.spherical.computeOffset(
			bounds.getNorthEast(),
			extendBy, 45
		),
		southwest = google.maps.geometry.spherical.computeOffset(
			bounds.getSouthWest(),
			extendBy, -135
		);*/
		//this.calculatedBounds = new LatLngBounds(southwest, northeast);
		this.calculatedBounds = bounds;
		return bounds;
	}
	
	/** Get array representing widths of each row */ 
	get rows() {
		let base = this.rowSize;
		return this.rowValues.map(value => {
			if (value == null) return base;
			else return value;
		})
	}
	
	/**
	 * Sets specific widths for a row, depending on the type given.
	 * Arrays overwrite the existing rowValue array, using the array's index
	 * as the key. Objects do the same, using the property as the key.
	 * Setting false will clear out all the rowValues, leaving just the base size.
	 * Setting just a number will change the base size.
	 * @param {number[]|Object|boolean|number} value
	 */
	set rows(value) {
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) {
				if (value[i] != null) this.rowValues[i] = value[i];
			}
		} else if (value === Object(value)) {
			for (let prop in value) {
				this.rowValues[parseInt(prop)] = value[prop]
			}
		} else if (value === false) {
			this.rowValues.map(() => null);
		} else {
			this.rowSize = value;
		}
	}
	
	/** Get array representing widths of each column */ 
	get columns() {
		let base = this.columnSize;
		return this.columnValues.map(value => {
			if (value == null) return base;
			else return value;
		})
	}
	
	/**
	 * Sets specific widths for a column, depending on the type given.
	 * Arrays overwrite the existing columnValue array, using the array's index
	 * as the key. Objects do the same, using the property as the key.
	 * Setting false will clear out all the columnValue, leaving just the 
	 * base size. Setting just a number will change the base size.
	 * @param {number[]|Object|boolean|number} value
	 */
	set columns(value) {
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) {
				if (value[i] != null) this.columnValues[i] = value[i];
			}
		} else if (value === false) {
			this.columnValues.map(() => null);
		} else {
			this.columnSize = value;
		}
	}
	
	/**
	 * Gets a heading perpendicular to the baseline
	 */
	perpendicularHeading() {
		let baseHeading = google.maps.geometry.spherical
			.computeHeading(this.baseline[0], this.baseline[1]);
		let angleShift = this.clockwise? 90 : -90;
		
		return angleToHeading(headingToAngle(baseHeading) + angleShift);
	}
	
	/**
	 * Create lines perpendicular to the baseline, stemming from it
	 */
	buildColumns() {
		let [start, end] = this.baseline;
		let length = google.maps.geometry.spherical
			.computeDistanceBetween(start, end);
		let heading = this.perpendicularHeading();
		
		let options = gridlineOptions;
		options.map = this.container.getMap();
		
		let index = 0, offset = 0, lines = [];
		while (offset < 1) {
			let point = google.maps.geometry.spherical.interpolate(start, end, offset)
			
			options.path = [point, growLine(point, heading, this.container)];
			lines.push(new google.maps.Polyline(options))
			
			let nextDistance = this.columns[index];
			if (nextDistance == null) nextDistance = this.columnSize;
			offset += nextDistance / length; index++;
		}
		return lines;
	}
	
	buildSquares() {
		let start = this.baseline[0];
		let xHeading = google.maps.geometry.spherical
			.computeHeading(start, this.baseline[1]);
		let yHeading = this.perpendicularHeading();
		
		//flood-fill algorithm
		let queue = [];
		queue.push(start);
		while (queue.length !== 0) {
			let n = queue[0];
			queue.splice(0, 1);
			
			let westPoint = google.maps.geometry.spherical.computeOffset(
				n, this.rowSize, xHeading);
			let northPoint = google.maps.geometry.spherical.computeOffset(
				n, this.columnSize, yHeading);
			
			if (!this.gridPoints.has(n) &&
			(google.maps.geometry.poly.containsLocation(n, this.container) ||
			google.maps.geometry.poly.containsLocation(westPoint, this.container) ||
			google.maps.geometry.poly.containsLocation(northPoint, this.container))) {
				this.gridPoints.add(start);
				
				///TODO: Use dynamic grid lengths
				queue.push(westPoint); //west
				queue.push(google.maps.geometry.spherical.computeOffset(
					n, this.rowSize, -xHeading)); //east
				queue.push(northPoint); //north
				queue.push(google.maps.geometry.spherical.computeOffset(
					n, this.columnSize, -yHeading)); //east
			}
		}
		return this.gridPoints;
	}
	
	/**
	 * Function that creates squares inside the given polygon
	 * @param {LatLngLiteral} position - latitude of the box's starting point
	 * @param {Polygon} within - restricted area for the polygon
	 */
	buildBox(position, within, heading, columnData, rowData) {
		let {xdir: xHeading, yDir: yHeading} = heading;
		let {size: coulumnSize, specific: columnSpecific} = columnData;
		let {size: rowSize, specific: rowSpecific} = rowData;
		
		
	}
}