/**
 * A map with a default value
 * @extends Map
 */
export default class DefaultMap extends Map {
	/**
	 * @param {*} base - the default value for this map
	 * @param {Iterable<K, V>} iterable - passed to Map constructor
	 */
	constructor(base, iterable) {
		super(iterable);
		this.base = base;
	}
	
	/**
	 * If the index does not exist, return the default instead
	 * @param {*} index - key for the map
	 * @returns {*} default value
	 */
	get(index) {
		const value = super.get(index);
		if (value === undefined) return this.base;
		else return value;
	}
}