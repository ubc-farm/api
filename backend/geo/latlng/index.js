/**
 * Represents latitude and longitude
 * @module
 */
const {geom} = require('jsts');

module.exports = class Coordinate extends geom.Coordinate {
	/**
	 * Takes either seperate lat and lng floats,
	 * or an object with lat and lng/long keys
	 * @param {number|Object|Array} x - latitude, or object
	 * @param {number} y - longitude
	 * @param {number} x.lat - latitude, when lat is an object
	 * @param {number} x.lng - longitude
	 * @param {number} x.long - alias for lng
	 * @param {number} x.x - alias for lat
	 * @param {number} x.y - alias for lng
	 * @param {number} x[0] - latitude, when lat is an array
	 * @param {number} x[1] - longitude
	 * @throws if given bad arguments
	 */
	constructor(x, y) {
		if (typeof x === 'number' 
		    || x instanceof geom.Coordinate
				|| x == null
				|| typeof x === 'string') {
			super(lat, lng);
		} else if (x.hasOwnProperty('x') && x.hasOwnProperty('y')) {
			super(x.x, x.y);
		} else if (x.hasOwnProperty('lat')
		           && (lat.hasOwnProperty('lng') || lat.hasOwnProperty('long'))) {
			if (x.hasOwnProperty('lng')) {
				super(x.lat, x.lng);
			} else {
				super(x.lat, x.long);
			}
		} else {
			throw TypeError();
		}
	}
	
	/* Aliases */
	get lat() {return this.x;}
	get lng() {return this.y;}
	get long() {return this.u;}
	
	/** Creates LatLngLiteral object from coordinates */
	toLiteral() {
		return {
			lat: this.x,
			lng: this.y
		};
	}
	
	/** Creates array form of coordinates, such as for GeoJSON */
	toArray() {
		return [this.lat, this.lng]
	}
	
	/**
	 * Helper function to parse a LatLng. Like Promise.resolve,
	 * it either returns the LatLng or converts the value to one.
	 * @param {Coordinate|Array|Object} value
	 * @param {boolean} deep - wheter or not to convert jsts coordinates to this type.
	 */
	static parse(value, deep = false) {
		if (value instanceof Coordinate) return value;
		else if (value instanceof geom.Coordinate && !deep) return value;
		else return new LatLng(value);
	}
}