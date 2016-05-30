const LatLng = require('../latlng/');

module.exports = class Field {
	/**
	 * @param {LatLng[]} path
	 */
	constructor(path, name = '', grid) {
		this.path = path.map(LatLng.parse);
		this.name = name;
		this.grid = grid;
	}
	
	/** 
	 * @returns {Array<[number, number]>} a coordinate array for GeoJSON,
	 * which includes the first point as the last point to connect the 
	 * path together.
	 */
	toArray() {
		let array = this.path;
		array.map(coord => coord.toGeo());
		array.push(coord[0]);
		return array;
	}
}