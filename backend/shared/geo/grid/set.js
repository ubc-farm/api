import jsts from 'jsts';

/**
 * Equivalent to set, but with different equality
 * checks so similar GridCells are checked properly
 * @module geo/grid/set.js
 */
export default class CellSet extends Map {
	constructor(iterable) {
		super(iterable);
		this[Symbol.iterator] = this.values;
	}
	
	/**
	 * Function used to check equality.
	 * Can be redefined later if needed.
	 * @param {Geometry} one
	 * @param {Geometry} two
	 * @returns {boolean} are they equal?
	 */
	static equal(one, two) {
		return one.equalsExact(two, .00001);
	}
	
	/**
	 * Converts object into a string key
	 * @param {Geometry} value
	 * @returns {string} key
	 */
	static toKey(value) {
		let center = value.getCentroid();
		return `x:${center.getX()},y:${center.getY()}`;
	}
	
	/**
	 * Equivalent to Set.add(). Adds an element to
	 * the set if it isn't in there already.
	 * @param {Geometry} value - item to add
	 * @returns {CellSet} this set
	 */
	add(value) {
		if (this.has(value)) { return this; }
		
		super.set(CellSet.toKey(value), value);
		return this;
	}
	
	/**
	 * Adds without double-checking that an item isn't in the set.
	 * Useful if you already checked Set.has() beforehand.
	 * @param {Geometry} value - item to add
	 * @returns {CellSet} this set
	 */
	forceAdd(value) {
		super.set(CellSet.toKey(value), value);
		return this;
	}
	
	/**
	 * Equivalent to Set.delete(). Removes a value
	 * from the set.
	 * @param {Geometry} value - item to delete
	 * @returns {boolean} true if the item was deleted and in the set
	 */
	delete(value) {
		if (!super.delete(CellSet.toKey(value))) {
			for (let [key, item] of super.entries) {
				if (CellSet.equal(value, item)) {
					return super.delete(key);
				}
			}
			
			return false;
		} else { return true; }
	}
	
	/**
	 * Equivalent to Set.has(). Checks if a value is
	 * in the set. 
	 * @param {Geometry} value - item to check
	 * @returns {boolean} value in the set?
	 */
	has(value) { 
		if (!super.has(CellSet.toKey(value))) { 
			for (let item of this) {
				if (CellSet.equal(value, item)) {
					return true;
				}
			}
			
			return false;
		} else { return true; }
	}
	
	/**
	 * Equivalent to Set.keys(), which returns
	 * values rather than keys.
	 */
	keys() { return super.values() }
}