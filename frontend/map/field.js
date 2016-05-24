/**
 * A JSON object representing a point
 * @typedef {Object} LatLngLiteral
 * @see google.maps.LatLngLiteral
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 */

/**
 * Represents a field
 */
export default class Field {
	/**
	 * @param {LatLngLiteral[]} path
	 * @param {string} name of the field
	 * @param {Object} [grid]
	 * @param {number} [grid.base=0] - ID of the edge the grid aligns to
	 * @param {number[]} [grid.widths=[]] - widths for each column
	 * @param {number[]} [grid.heights=[]] - heights for each row
	 */
	constructor(path, name, {base = 0, widths = [], heights = []}) {
		this.path = path;
		this.name = name;
		this.grid_base = base;
		this.grid_widths = widths;
		this.grid_heights = heights;
		
		this.pathUpdated = false;
	}
	
	/**
	 * Get's a polygon's path as a JSON array
	 * @requires google.maps
	 * @param {google.maps.Polygon} polygon
	 * @returns {LatLngLiteral[]} 
	 */
	static toPath(polygon) {
		return poly.getPath().getArray().map(val => val.toJSON());
	}
	
	/**
	 * Converts the polygon to a fresh path if nessecary
	 * @returns {LatLngLiteral[]}
	 */
	get path() {
		if (this.polygon && !this.pathUpdated) {
			this.path = Field.toPath(this.polygon);
		} 
		return this.path;
	}
	
	/**
	 * Sets the path and updates the polygon if nessecary
	 * @param {LatLngLiteral[]}
	 */
	set path(path) {
		this.path = path;
		if (this.polygon) {
			this.polygon.setPath(path);
		}
	}
	
	/**
	 * Creates a polygon from the path if one doesn't exist
	 * @requires google.maps
	 */
	get polygon() {
		if (!this.polygon) {
			this.polygon = new google.maps.Polygon({
				editable: true,
				fillOpacity: 0.7,
				fillColor: 'rgb(59, 166, 72)',
				strokeOpacity: 1,
				strokeColor: 'rgb(59, 166, 72)',
				path: this.path
			})
		}
		return this.polygon;
	}
	
	/**
	 * Sets the polygon and updates the path. You can create a new Field from a
	 * polygon instead of a path by using a null path, then setting the polygon
	 * with this method.
	 * @requires google.maps
	 * @param {google.maps.Polygon} poly
	 */
	set polygon(poly) {
		poly.Field = this;
		this.polygon = poly;
		this.path = Field.toPath(poly);
		this.pathUpdated = false;
	}
	
	/**
	 * Checks if a point is within the Field's polygon.
	 * @requires google.maps
	 * @param {LatLngLiteral} point
	 * @returns {boolean} 
	 */
	within(point) {
		return google.maps.geometry.containsLocation(point, this.polygon);
	}
}