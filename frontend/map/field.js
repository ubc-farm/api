/**
 * Represents a field
 * @module map/field.js
 */

/**
 * Gets a single edge from a path
 * @param {LatLngLiteral[] | LatLng[]} path
 * @param {number} index - number of the edge
 * @returns {LatLngLiteral[] | LatLng[]}
 */
function getSegment(path, index = 0) {
	let [i, next] = [index, index + 1].map(v => v % path.length);
	
	return [path[i], path[next]]
}

export class Field {
	/**
	 * A JSON object representing a point
	 * @typedef {Object} LatLngLiteral
	 * @see google.maps.LatLngLiteral
	 * @property {number} lat - latitude
	 * @property {number} lng - longitude
	 */
	
	/**
	 * @param {LatLngLiteral[]} path
	 * @param {string} name of the field
	 * @param {Object} [grid]
	 * @param {number} [grid.base=0] - ID of the edge the grid aligns to
	 * @param {number[]} [grid.widths=[]] - widths for each column
	 * @param {number[]} [grid.heights=[]] - heights for each row
	 */
	constructor(path, name = '', grid = {}) {
		console.log('construtor')
		let {base = 0, widths = [], heights = []} = grid;
		this.pathJson = path;
		this.name = name;
		this.grid_base = base;
		this.grid_widths = widths;
		this.grid_heights = heights;
		
		this.pathUpdated = false;
	}
	
	/**
	 * Gets the polygon's path as a JSON array
	 * @returns {LatLngLiteral[]} 
	 */
	toPath() {
		console.log('toPath')
		return this.polygon.getPath().getArray().map(val => val.toJSON());
	}
	
	/**
	 * Get an array of LatLngLiteral lines, each
	 * representing an edge of the field.
	 * @param {boolean} googleType - return an array of MVCArray's instead of JSON
	 * @returns {LatLngLiteral[][] | Array<MVCArray<LatLng>>}
	 */
	toLines(googleType = false) {
		console.log('toLines')
		let path, literal = true, lines = [];
		if (googleType && this.googlePolygon) {
			path = this.polygon.getPath().getArray();
			literal = false;
		} else {
			path = this.path;
		}
		
		for (let i = 0; i < path.length; i++) {
			let line = getSegment(path, i);
			
			//line is an Array of LatLng, which we want
			if (!literal) {
				line = new google.maps.MVCArray(line);
			}
			//line is an Array of LatLngLiteral, but we want LatLng
			else if (googleType) {
				line = new google.maps.MVCArray(
					line.map(literal => new google.maps.LatLng(literal)));
			}	
			//else: line is an Array of LatLngLiteral, just use that

			line.polygonEdge = i;
			lines.push(line);
		}
		
		return lines;
	}
	
	/**
	 * Gets a single line from the Field.
	 */
	getLine(index) {
		if (this.googlePolygon) {
			return getSegment(this.polygon.getPath().getArray(), index);
		} else {
			return getSegment(this.path, index);
		}
	}
	
	/**
	 * Converts the polygon to a fresh path if nessecary
	 * @returns {LatLngLiteral[]}
	 */
	get path() {
		console.log('get path')
		if (this.googlePolygon && !this.pathUpdated) {
			this.pathJson = this.toPath();
		} 
		return this.pathJson;
	}
	
	/**
	 * Sets the path and updates the polygon if nessecary
	 * @param {LatLngLiteral[]}
	 */
	set path(path) {
		console.log('set path')
		this.pathJson = path;
		if (this.googlePolygon) {
			this.polygon.setPath(path);
		}
	}
	
	/**
	 * Creates a polygon from the path if one doesn't exist
	 * @requires google.maps
	 */
	get polygon() {
		console.log('get polygon')
		if (!this.googlePolygon) {
			let opts = polygonOptions;
			opts.path = this.path;
			this.googlePolygon = new google.maps.Polygon(opts);
		}
		return this.googlePolygon;
	}
	
	/**
	 * Sets the polygon and updates the path. You can create a new Field from a
	 * polygon instead of a path by using a null path, then setting the polygon
	 * with this method.
	 * @requires google.maps
	 * @param {google.maps.Polygon} poly
	 */
	set polygon(poly) {
		console.log('set polygon')
		poly.Field = this;
		this.googlePolygon = poly;
		this.pathJson = this.toPath();
		this.pathUpdated = false;
	}
	
	/**
	 * Changes the widths specified. A row is ignored if it is undefined or null.
	 */
	set grid_widths(widths) {
		for (let i = 0; i < widths.length; i++) {
			if (widths[i]) {this.grid_widths[i] = widths[i]}
		}
	}
	/**
	 * Changes the heights specified. A row is ignored if it is undefined or null.
	 */
	set grid_heights(heights) {
		for (let i = 0; i < heights.length; i++) {
			if (heights[i]) {this.grid_heights[i] = heights[i]}
		}
	}
	
	/**
	 * Checks if a point is within the Field's polygon.
	 * @requires google.maps.geometry
	 * @param {LatLngLiteral} point
	 * @returns {boolean} 
	 */
	within(point) {
		return google.maps.geometry.containsLocation(point, this.polygon);
	}
	
	/**
	 * Set's the polygon's visibility
	 * @requires google.maps
	 */
	set visible(value) {this.polygon.setVisible(value)}
	
	/** 
	 * Set's the polygon's map 
	 * @requires google.maps
	 */
	set map(value) {this.polygon.setMap(value)}
}

export const polygonOptions = {
	editable: false,
	geodesic: true,
	fillOpacity: 0.7,
	fillColor: 'rgb(59, 166, 72)',
	strokeOpacity: 1,
	strokeColor: 'rgb(59, 166, 72)'
}