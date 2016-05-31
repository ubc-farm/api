const {geom: {Coordinate}} = require('jsts');

/**
 * Equivalent to set, but with different equality
 * checks so similar LatLngs are checked properly
 * @module
 */
module.exports = class CoordinateSet extends Map {
	constructor(iterable) {
		super(iterable);
		this[Symbol.iterator] = this.values;
	}
	
	/**
	 * Function used to check equality.
	 * Can be redefined later if needed.
	 * @param {Coordinate} one
	 * @param {Coordinate} two
	 * @returns {boolean} are they equal?
	 */
	static equal(one, two) {
		return one.equals(two);
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
		
		super.set(value.toString(), value);
		return this;
	}
	
	/**
	 * Adds without double-checking that an item isn't in the set.
	 * Useful if you already checked Set.has() beforehand.
	 * @param {LatLng} value - item to add
	 * @returns {LatLngSet} this set
	 */
	forceAdd(value) {
		value = LatLng.parse(value);
		super.set(value.toString(), value);
		return this;
	}
	
	/**
	 * Equivalent to Set.delete(). Removes a value
	 * from the set.
	 * @param {LatLng} value - item to delete
	 * @returns {boolean} true if the item was deleted and in the set
	 */
	delete(value) {
		value = LatLng.parse(value);
		if (!super.delete(value.toString())) {
			for (let [key, item] of this) {
				if (CoordinateSet.equal(value, item)) {
					return super.delete(key);
				}
			}
			
			return false;
		} else { return true; }
	}
	
	/**
	 * Equivalent to Set.has(). Checks if a value is
	 * in the set. 
	 * @param {LatLng} value - item to check
	 * @returns {boolean} value in the set?
	 */
	has(value) {
		value = LatLng.parse(value);
		if (super.has(value.toString())) {
			for (let [, item] of this) {
				if (CoordinateSet.equal(value, item)) {
					return true;
				}
			}
			
			return false;
		} else { return false; }
	}
	
	/**
	 * Equivalent to Set.keys(), which returns
	 * values rather than keys.
	 */
	keys() { return super.values() }
}