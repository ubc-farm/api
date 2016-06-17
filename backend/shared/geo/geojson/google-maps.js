/**
 * Converts Google Maps API objects to GeoJSON
 */

import Position from './position.js';
import Polygon from './polygon.js';

/** @param {google.maps.LatLng} */
Position.fromGoogle = function(latlng) {
	return new Position([latlng.lng(), latlng.lat()]);
}

/** @param {google.maps.Polygon} */
Polygon.fromGoogle = function(polygon) {
	let paths = polygon.getPaths().getArray()
	.map(path => {
		let p = path.getArray().map(Position.fromGoogle);
		p.push(p[0]);
		return p;
	});
	return new Polygon(...paths);
}

export {Polygon, Position};