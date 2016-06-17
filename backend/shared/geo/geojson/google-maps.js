/**
 * Converts Google Maps API objects to GeoJSON
 */

import Position from './position.js';
import Polygon from './polygon.js';

/** @param {google.maps.Polygon} */
Polygon.fromGoogle = function(polygon) {
	let paths = polygon.getPaths().getArray()
	.map(path => {
		let p = path.getArray().map(point => {
			return new Position(point.lng(), point.lat());
		});
		p.push(p[0]);
		return p;
	});
	return new Polygon(paths);
}