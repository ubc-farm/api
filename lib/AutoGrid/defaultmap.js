/**
 * A map with a default value
 * @extends Map
 */
export default class DefaultMap extends Map {
	constructor(base) {
		super();
		this.base = base;
	}
	
	/**
	 * If the index does not exist, return the default instead
	 */
	get(index) {
		const value = super.get(index);
		if (value === undefined) return this.base;
		else return value;
	}

	/**
	 * Uses an array of key, value pairs (i.e.: Map.entries()) to insert values
	 * into this map at the provided keys.
	 */
	insert(entries) {
		for (let [key, value] of entries) this.set(key, value);
	}
}