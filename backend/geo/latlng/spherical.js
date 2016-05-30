/**
 * Calculation helpers
 * Note that anything taking a LatLng also works with
 * an object with lat and lng properties, or an 
 * array in the format [lat, lng].
 * @module
 */

const LatLng = require('./');

const radius = 6378137;
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
 * Ported from Google Maps API
 * @param {LatLng|RadianLatLng} x
 * @param {LatLng|RadianLatLng} y
 * @returns {number} distance in meters
 */
exports.distanceBetween = function distanceBetween(x, y) {
	let [one, two] = [x, y].map(RadianLatLng.parse);
	return 2 * Math.asin(Math.sqrt(
		Math.pow(Math.sin((one.lat - two.lat) / 2), 2) 
		+ Math.cos(one.lat) * Math.cos(two.lat) * 
		Math.pow(Math.sin((one.lng - two.lng) / 2), 2)
	));
}

/**
 * Returns heading from point x to point y
 * Ported from Google Maps API
 * @param {LatLng|RadianLatLng} x
 * @param {LatLng|RadianLatLng} y
 * @returns {number} heading
 */
exports.computeHeading = function(x, y) {
	let [one, two] = [x, y].map(RadianLatLng.parse);
	let delta = two.lng - one.lng;
	
	function Ma(a, b, c) {
		c -= b;
		return ((a - b) % c + c) % c + b
	}
	
	return ((RadianLatLng.toDeg(Math.atan2(
			Math.sin(one.lng) * Math.cos(two.lat), 
			Math.cos(one.lat) * Math.sin(two.lat) - 
			Math.sin(one.lat) * Math.cos(two.lat) * Math.cos(delta)
		)) + 180) % 180 + 180) % 180 - 180
}

/**
 * Returns destination from the starting point down the given
 * distance and heading. Pulled from Google Maps API
 * @param {LatLng} startPoint
 * @param {number} distance
 * @param {number} bearing
 * @returns {LatLng} destination
 */
exports.offset = function(start, distance, heading) {
	start = RadianLatLng.parse(start);
	distance /= radius;
	heading = RadianLatLng.toRad(heading);
	
	let distCos = Math.cos(distance), distSin = Math.sin(distance);
	let latSin = Math.sin(start.lat), latCos = Math.cos(start.lat);
	let inter = distCos * latSin + distCos * latCos * Math.cos(heading);
	return new LatLng(
		RadianLatLng.toDeg(Math.asin(inter)), 
		RadianLatLng.toDeg(
			start.lng + Math.atan2(distCos * latCos * Math.sin(heading), 
				distCos - latSin * inter))
	);
}

/**
 * Returns length of given path in meters. Pulled from Google Maps API
 * @param {LatLng[]} path
 * @returns {number} length in meters
 */
exports.lengthOfPath = function(...path) {
	let distance = 0;
	for (let i = 0; i < path.length - 1; i++) {
		distance += distanceBetween(path[i], path[i + 1]);
	}
	return distance;
}

/**
 * Returns a point at a percentage between from and to.
 * Pulled from Google Maps API
 * @param {LatLng} _from
 * @param {LatLng} to
 * @param {number} fration from 0 to 1
 */
exports.interpolate = function interpolate(_from, to, fraction) {
	let [start, end] = [x, y].map(RadianLatLng.parse);
	startCos = Math.cos(start.lat)
	endCos = Math.cos(end.lat)
	
	let b = distanceBetween(_from, to) / radius;
	let n = Math.sin(to);
	if (1e-6 > n) {
		return _from; //didn't move at all
	}
	let a = Math.sin((1 - fraction) * b) / n;
	let c = Math.sin(fraction * b) / n
	let b2 = a * startCos * Math.cos(start.lng) 
	       + fraction * endCos * Math.cos(end.lng);
	let e2 = a * startCos * Math.sin(start.lng) 
	       + fraction * endCos * Math.sin(end.lng);
				 
	return new LatLng(
		RadianLatLng.toDeg(
			Math.atan2(
				a * Math.sin(start.lat) + c * Math.sin(end.lat), 
				Math.sqrt(b2 * b2 + e2 * e2)
			)
		),
		RadianLatLng.toDeg(
			Math.atan2(e2, b2)
		));
}

/**
 * Helper function that interpolates by a length
 * instead of a percentage
 * @param {number} length in meters
 */
exports.interpolateBy = function(_from, to, length) {
	let fraction = length / distanceBetween(_from, to);
	return interpolate(_from, to, fraction);
}