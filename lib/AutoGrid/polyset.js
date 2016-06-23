/**
 * Equivalent to set, but with different equality
 * checks so similar GridCells are checked properly.
 * @extends Set
 */
export default class PolygonSet extends Set {
	/**
	 * @param {Iterable<K, V>} iterable
	 */
	constructor(iterable) {
		super(iterable);
	}
	
	/**
	 * Function used to check equality.
	 * Can be redefined later if needed.
	 * @param {jsts.geom.Geometry} one
	 * @param {jsts.geom.Geometry} two
	 * @returns {boolean} are they equal?
	 */
	static equal(one, two) {
		return one.equalsExact(two, .00001);
	}
	
	/**
	 * Equivalent to Set.add(). Adds an element to
	 * the set if it isn't in there already.
	 * @param {jsts.geom.Geometry} value - item to add
	 * @returns {PolygonSet} this set
	 */
	add(value) {
		if (this.has(value)) return this;
		return this.forceAdd(value);
	}
	
	/**
	 * Adds without double-checking that an item isn't in the set.
	 * Useful if you already checked Set.has() beforehand.
	 * @param {jsts.geom.Geometry} value - item to add
	 * @returns {PolygonSet} this set
	 * @throws if value isn't a jsts geometry - specifically if it doesn't have 
	 * the equalsExact function as a property
	 */
	forceAdd(value) {
		if (typeof value.equalsExact !== 'function')
			throw TypeError('Added geometry must have function this.equalsExact(b)')
		super.add(value);
		return this;
	}
	
	/**
	 * Equivalent to Set.delete(). Removes a value
	 * from the set.
	 * @param {jsts.geom.Geometry} value - item to delete
	 * @returns {boolean} true if the item was deleted and in the set
	 */
	delete(value) {
		if (!super.delete(value)) {
			for (let item of this) 
				if (PolygonSet.equal(item, value)) return super.delete(item);
			return false;
		} else return true;
	}
	
	/**
	 * Equivalent to Set.has(). Checks if a value is
	 * in the set. 
	 * @param {jsts.geom.Geometry} value - item to check
	 * @returns {boolean} value in the set?
	 */
	has(value) { 
		if (!super.has(value)) { 
			for (let item of this) 
				if (PolygonSet.equal(item, value)) return true;
			return false;
		} else 
			return true;
	}
}