/**
 * @module lib/collection
 */

import id from 'lib/utils/id';

/**
 * @extends Set
 */
export default class Collection extends Set {
	constructor(iterable) {
		super(iterable);
		this.args = args;
		this.ids = [];
	}

	static id() {return id()}

	clone() {
		return new this.constructor(this);
	}

	/** Removes all elements from the collection */
	clear() {
		super.clear();
		this.ids.length = 0;
	}

	/**
	 * @param {number} index
	 * @returns {any|undefined} the value associated to the index, 
	 * or undefined if there is none
	 */
	getAt(index) {
		let i = 0;
		for (let value of this.values) {
			if (i === index) return value;
			i++;
		}
	}

	/**
	 * @param {string} key
	 * @returns {any} the value associated to the key
	 * @throws {RangeError} if the key doesn't exist
	 */
	getKey(key) {
		const index = this.ids.indexOf(key);
		if (index < 0) throw RangeError('Key does not exist');
		return this.getAt(index);
	}

	/**
	 * Removes any value associated with the index
	 * @param {number} index
	 * @returns {any} the deleted value
	 * @throws {RangeError} if the index doesn't exist
	 */
	deleteAt(index) {
		if (index < 0 || index >= this.size) throw RangeError(); 
		const value = this.getAt(index);
		this.ids.splice(index, 1);
		return this.delete(value);
	}

	/**
	 * Removes any value associated with the key
	 * @param {string} key
	 * @returns {any} the deleted value
	 * @throws {RangeError} if the key doesn't exist
	 */
	deleteKey(key) {
		return this.delete(this.getKey(key));
	}

	/**
	 * @param {string} key
	 * @returns {boolean} if the key exists
	 */
	hasKey(key) {
		return this.ids.indexOf(key) > 0;
	}

	/**
	 * Sets the value for the key in the object.
	 * @param {string} key to use
	 * @param {any} value to insert
	 * @returns {boolean} false if the value already exists
	 */
	set(key, value) {
		if (this.has(value)) return false;
		this.ids.push(key);
		super.add(value);
		return true;
	}

	/**
	 * @param {any} value to add to the collection
	 * @returns {string|boolean} the key created for the value, 
	 * or false if the value already existed
	 */
	add(...args) {
		const key = this.constructor.id();
		const successState = this.set(key, ...args);
		if (successState == true) return key;
		else return false;
	}

	keys() {
		return this.ids[Symbol.iterator]();
	}

	*entries() {
		let i = 0;
		for (let value of this.values) {
			yield [this.ids[i], value];
			i++;
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}
}