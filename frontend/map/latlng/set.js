import {LatLng} from 'map/latlng/index.js';

/**
 * Equivalent to set, but with different equality
 * checks so similar LatLngs are checked properly
 * @module map/latlng/set.js
 */
export class LatLngSet extends Map {
	constructor(iterable) {
		super(iterable);
		this[Symbol.iterator] = this.values;
	}
	
	add(value) {
		value = LatLng.parse(value);
		this.map.set(value.toString(), value);
		return this;
	}
	
	delete(value) {
		value = LatLng.parse(value);
		return this.map.delete(value.toString());
	}
	
	has(value) {
		value = LatLng.parse(value);
		return this.map.has(value.toString());
	}
	
	keys() { return super.values() }
}