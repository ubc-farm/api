/**
 * Represents latitude and longitude
 * @module
 */
module.exports = class LatLng {
	
	/**
	 * Takes either seperate lat and lng floats,
	 * or an object with lat and lng/long keys
	 * @param {number|Object|Array} lat - latitude, or object
	 * @param {number} lng - longitude
	 * @param {number} lat.lat - latitude, when lat is an object
	 * @param {number} lat.lng - longitude
	 * @param {number} lat.long - alias for lng
	 * @param {number} lat[0] - latitude, when lat is an array
	 * @param {number} lat[1] - longitude
	 * @throws if given bad arguments
	 */
	constructor(lat, lng) {
		if (lng != null) {
			this.lat = parseFloat(lat);
			this.lng = parseFloat(lng);
		} else if (Array.isArray(lat)) {
			let [_lat, _lng] = lat;
			this.lat = parseFloat(_lat);
			this.lng = parseFloat(_lng);
		} else if (lat.hasOwnProperty('lat') 
		&& (lat.hasOwnProperty('lng') || lat.hasOwnProperty('long'))) {
			
			if (lat.hasOwnProperty('long')) {
				var {lat: _lat, long: _lng} = lat;	
			} else {
				var {lat: _lat, lng: _lng} = lat;
			}
			
			this.lat = parseFloat(_lat);
			this.lng = parseFloat(_lng);
		} else {
			throw TypeError();
		}
	}
	
	/** Alias for lng */
	get long() { return this.lng; }
	set long(value) { this.lng = value; }
	
	/** Creates JSON string of coordinates */
	toString() {
		return JSON.stringify({
			lat: this.lat,
			lng: this.lng
		});
	}
	
	/** Creates array form of coordinates, such as for GeoJSON */
	toArray() {
		return [this.lat, this.lng]
	}
	
	/**
	 * Helper function to parse a LatLng. Like Promise.resolve,
	 * it either returns the LatLng or converts the value to one.
	 * @param {LatLng|Array|Object} value
	 */
	static parse(value) {
		if (value instanceof LatLng) return value;
		else return new LatLng(value);
	}
	
	/**
	 * Checks if two LatLngs are equal
	 * @param {LatLng} x 
	 * @param {LatLng} y
	 * @throws if x or y are not LatLngs
	 */
	static equal(x, y) {
		if (!(x instanceof LatLng) || !(y instanceof LatLng)) {
			throw TypeError();
		}
		
		return ((Math.abs(x.lat - y.lat) < Number.EPSILON)
			&& (Math.abs(x.lng - y.lng) < Number.EPSILON));
	}
}