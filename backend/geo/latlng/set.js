/**
 * Equivalent to set, but with different equality
 * checks so similar LatLngs are checked properly
 * @module
 */
module.exports = class LatLngSet extends Map {
	constructor(iterable) {
		super(iterable);
		this[Symbol.iterator] = this.values;
	}
	
	add(latlng) {
		this.map.set(JSON.stringify(latlng), latlng);
		return this;
	}
	
	delete(latlng) {
		return this.map.delete(JSON.stringify(latlng));
	}
	
	has(latlng) {
		return this.map.has(JSON.stringify(latlng));
	}
	
	keys() { return super.values() }
}