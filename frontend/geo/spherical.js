/**
 * Calculation helpers that match up with Google Maps API
 * @module
 */

import jsts from 'jsts';
import * as Angle from './angle.js';
const {geom: {Coordinate}} = jsts;

/** Radius of earth, same as Google Maps API */
export const radius = 6378137;

class RadCoord extends Coordinate {
	constructor(lat, lng) {
		lat = Angle.toRadians(lat);
		lng = Angle.toRadians(lng);
		super(lng, lat);
	}
	
	get lat() {return this.y}
	get lng() {return this.x}
	get long() {return this.x}
	
	static parse(value) {
		if (value instanceof RadCoord) return value;
		else if (value.hasOwnProperty('lat') && value.hasOwnProperty('lng')) {
			return new RadCoord(value.lat, value.lng);
		} else if (value.hasOwnProperty('x') && value.hasOwnProperty('y')) {
			return new RadCoord(value.y, value.x);
		} 
	}
}

/**
 * Returns distance from point x to point y
 * Ported from Google Maps API
 * @param {Coordinate} x
 * @param {Coordinate} y
 * @returns {number} distance in meters
 */
export function distanceBetween(x, y) {
	let [one, two] = [x, y].map(RadCoord.parse);
	return 2 * Math.asin(Math.sqrt(
		Math.pow(Math.sin((one.lat - two.lat) / 2), 2) 
		+ Math.cos(one.lat) * Math.cos(two.lat) * 
		Math.pow(Math.sin((one.lng - two.lng) / 2), 2)
	));
}

/**
 * Returns heading from point x to point y
 * Ported from Google Maps API
 * @param {Coordinate} x
 * @param {Coordinate} y
 * @returns {number} heading
 */
export function computeHeading(x, y) {
	let [one, two] = [x, y].map(RadCoord.parse);
	let delta = two.lng - one.lng;
	
	/*return new Angle(((Angle.toDegrees(Math.atan2(
			Math.sin(one.lng) * Math.cos(two.lat), 
			Math.cos(one.lat) * Math.sin(two.lat) - 
			Math.sin(one.lat) * Math.cos(two.lat) * Math.cos(delta)
		)) + 180) % 180 + 180) % 180 - 180, true);*/
	return Angle.toDegrees(Angle.normalizePositive(
		Math.atan2(
			Math.sin(one.lng) * Math.cos(two.lat), 
			Math.cos(one.lat) * Math.sin(two.lat) - 
			Math.sin(one.lat) * Math.cos(two.lat) * Math.cos(delta)
		)
	));
}

/**
 * Returns destination from the starting point down the given
 * distance and heading. Pulled from Google Maps API
 * @param {Coordinate} startPoint
 * @param {number} distance
 * @param {number} heading
 * @returns {Coordinate} destination
 */
export function offset(start, distance, heading) {
	start = RadCoord.parse(start);
	distance /= radius;
	heading = Angle.toRadians(heading);
	
	var e = start.lat; //return Radian lat
	var a = start.lng; //return Radian lng
	var d = Math.cos(distance);
	var b = Math.sin(distance);
	var f = Math.sin(e)
	  , e = Math.cos(e)
	  , g = d * f + b * e * Math.cos(heading);
	let result = {
		lat: Angle.toDegrees(Math.asin(g)),
		lng: Angle.toDegrees(a + Math.atan2(b * e * Math.sin(heading), d - f * g))
	}
	console.log(result);
	return new Coordinate(result.lng, result.lat);
} 

/**
 * Returns length of given path in meters. Pulled from Google Maps API
 * @param {Coordinate[]} path
 * @returns {number} length in meters
 */

/*export function lengthOfPath(...path) {
	let distance = 0;
	for (let i = 0; i < path.length - 1; i++) {
		distance += distanceBetween(path[i], path[i + 1]);
	}
	return distance;
}*/

/**
 * Returns a point at a percentage between from and to.
 * Pulled from Google Maps API
 * @param {Coordinate} _from
 * @param {Coordinate} to
 * @param {number} fraction from 0 to 1
 */
export function interpolate(_from, to, fraction) {
	let [start, end] = [x, y].map(RadCoord.parse);
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
				 
	return new Coordinate(
		Angle.toDegrees(
			Math.atan2(
				a * Math.sin(start.lat) + c * Math.sin(end.lat), 
				Math.sqrt(b2 * b2 + e2 * e2)
			)
		),
		Angle.toDegrees(
			Math.atan2(e2, b2)
		));
}

/**
 * Helper function that interpolates by a length
 * instead of a percentage
 * @param {number} length in meters
 */
export function interpolateBy(_from, to, length) {
	let fraction = length / distanceBetween(_from, to);
	return interpolate(_from, to, fraction);
}