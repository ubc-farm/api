/**
 * Calculation helpers
 * Note that anything taking a LatLng also works with
 * an object with lat and lng properties, or an 
 * array in the format [lat, lng].
 * @module
 */

const LatLng = require('./');

const radius = 6371e3
exports.RADIUS = radius;

/**
 * Radian equivalent of degrees LatLng
 */
class RadianLatLng extends LatLng {
	constructor(lat, lng) {
		super(lat, lng);
		this.lat = RadianLatLng.toRad(this.lat);
		this.lng = RadianLatLng.toRad(this.lng);
	}
	
	static toRad(degrees) {return degrees * Math.PI / 180}
	static toDeg(radians) {return radians * 180 / Math.PI}
	
	static parse(value) {
		if (value instanceof RadianLatLng) return value;
		else return new RadianLatLng(value);
	}
}

/**
 * Returns distance from point x to point y
 * @param {LatLng|RadianLatLng} x
 * @param {LatLng|RadianLatLng} y
 * @returns {number} distance in meters
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
exports.distanceBetween = function(x, y) {
	let [one, two] = [x, y].map(RadianLatLng.parse);
	let delta = {lat: (two.lat - one.lat), lng: (two.lng - one.lng)};
	
	let a = Math.sin(delta.lat/2) * Math.sin(delta.lat/2)
	      + Math.cos(one.lat) * Math.cos(two.lat)
				* Math.sin(delta.lng/2) * Math.sin(delta.lng/2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return c * radius;
}

/**
 * Returns initial bearing from point x to point y
 * @param {LatLng|RadianLatLng} x
 * @param {LatLng|RadianLatLng} y
 * @returns {number} in degrees from north
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
exports.bearing = function(x, y) {
	let [one, two] = [x, y].map(RadianLatLng.parse);
	let delta = {lng: (two.lng - one.lng)};
	
	let a = Math.sin(delta.lng) * math.cos(two.lat);
	let b = Math.cos(one.lat) * Math.sin(two.lat)
	      - Math.sin(one.lat) * Math.cos(two.lat) 
				* Math.cos(delta.lng);
	let c = Math.atan2(a, b);
	return (RadianLatLng.toDeg(c) + 360) % 360;
}

/**
 * Returns destination from the starting point down the given
 * distance and initial bearning
 * @param {LatLng} startPoint
 * @param {number} distance
 * @param {number} bearing
 * @returns {LatLng} destination
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
exports.offset = function(startPoint, distance, bearing) {
	let start = RadianLatLng.parse(startPoint);
	distance = Number(distance) / radius;
	bearing = RadianLatLng.toRad(bearing);
	
	let endLat = Math.asin(
		Math.sin(start.lat) * Math.cos(distance) +
		Math.cos(start.lat) * Math.sin(distance) *
		Math.cos(bearing));
	let b = Math.cos(distance) - Math.sin(start.lat) * Math.sin(endLat);
	let a = Math.sin(bearing) * Math.sin(distance) * Math.cos(start.lat);
	let endLng = start.lng + Math.atan2(a, b);
	
	return new LatLng(
		RadianLatLng.toDeg(endLat),
		(RadianLatLng.toDeg(endLng) + 540) % 360 - 180 
	);
}

exports