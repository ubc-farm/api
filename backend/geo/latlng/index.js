/**
 * Represents latitude and longitude
 * @module
 */
module.exports = class LatLng {
	
	/**
	 * Takes either seperate lat and lng floats,
	 * or an object with lat and lng/long keys
	 * @param {number|Object} lat - latitude, or object
	 * @param {number} lng - longitude
	 * @param {number} lat.lat - latitude, when lat is an object
	 * @param {number} lat.lng - longitude
	 * @param {number} lat.long - alias for lng
	 */
	constructor(lat, lng) {
		if (lng != null) {
			this.lat = parseFloat(lat);
			this.lng = parseFloat(lng);
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
	
	static parse(value) {
		if (value instanceof LatLng) return value;
		else return new LatLng(value.lat, value.lng);
	}
}