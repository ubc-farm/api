/**
 * Represents latitude and longitude
 * @module
 */
import jsts from 'jsts';

export default class Coordinate extends jsts.geom.Coordinate {
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
		    || x instanceof jsts.geom.Coordinate
				|| x == null
				|| typeof x === 'string') {
			super(x, y);
		} else if (x.hasOwnProperty('x') && x.hasOwnProperty('y')) {
			super(x.x, x.y);
		} else if (x.hasOwnProperty('toJSON')) {
			let json = x.toJSON(); //Google Maps LatLng -> LatLngLiteral
			super(json.lng, json.lat);
		} else if (x.hasOwnProperty('lat')
		           && (lat.hasOwnProperty('lng') || lat.hasOwnProperty('long'))) {
			if (x.hasOwnProperty('lng')) {
				super(x.lng, x.lat);
			} else {
				super(x.long, x.lat);
			}
		} else {
			throw TypeError();
		}
	}
	
	/* Aliases */
	get lat() {return this.y;}
	get lng() {return this.x;}
	get long() {return this.x;}
	
	/** Creates LatLngLiteral object from coordinates */
	toLiteral() {
		return {
			lat: this.y,
			lng: this.x
		};
	}
	
	/** Create coordinate string */
	toString() {
		return `{x:${this.x},y:${this.y}}`
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
		else if (value instanceof jsts.geom.Coordinate && !deep) return value;
		else return new LatLng(value);
	}
}