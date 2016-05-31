const LatLng = require('./');

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
	
	/**
	 * Equivalent to Set.add(). Adds an element to
	 * the set if it isn't in there already.
	 * @param {LatLng} value - item to add
	 * @returns {LatLngSet} this set
	 */
	add(value) {
		value = LatLng.parse(value);
		if (this.has(value)) { return this; }
		
		this.map.set(value.toString(), value);
		return this;
	}
	
	/**
	 * Equivalent to Set.delete(). Removes a value
	 * from the set.
	 * @param {LatLng} value - item to add
	 * @returns {boolean} true if the item was deleted and in the set
	 */
	delete(value) {
		value = LatLng.parse(value);
		if (!this.map.delete(value.toString())) {
			for (let [key, item] of this) {
				if (LatLng.equals(value, item)) {
					return this.map.delete(key);
				}
			}
			
			return false;
		} else { return true; }
	}
	
	/**
	 * Equivalent to Set.has(). Checks if a value is
	 * in the set. 
	 */
	has(value) {
		value = LatLng.parse(value);
		if (this.map.has(value.toString())) {
			for (let [, item] of this) {
				if (LatLng.equals(value, item)) {
					return true;
				}
			}
			
			return false;
		} else { return false; }
	}
	
	keys() { return super.values() }
}