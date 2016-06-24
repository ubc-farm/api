const defaultFunc = (keyVal) => keyVal

/**
 * Uses Map as rows in the table, with Map keys as the columns.
 * @extends Array<Map>
 */
export class Table extends Array {
	/**
	 * @param {Iterable<Object>} data - each object is turned into a map. 
	 * Array-likes and iterables are converted via Array.from
	 * @param {function} reviver
	 */
	constructor(data, reviver = defaultFunc) {
		super(...Array.from(data, object => {
			let keyValSet = [];
			for (let key in object) {
				const keyVal = reviver([key, object[key]]);
				if (keyVal != null) keyValSet.push(keyVal);
			}
			return new Map(keyValSet);
		})));
		this.replacer = defaultFunc;
	}

	/**
	 * Sorts the table based on a column key
	 * @param {*} column - should correspond to a paticular key
	 * @param {function} [compareFunc] - compares the values in the given column
	 */
	sort(column, compareFunc = (a, b) => a.toString().localeCompare(b)) {
		return super.sort((aMap, bMap) => {
			const a = aMap.get(key), b = bMap.get(key);
			return compareFunc(a, b);
		})
	}

	/** Removes all rows from the table (akin to Map.clear()) */
	clear() {this.length = 0}

	/**
	 * Deletes the given row, either by using its index or looking it up.
	 * @param {number|Map} row - either the row to delete, or its index
	 * @returns {boolean} true if found and deleted, false otherwise
	 */
	delete(row) {
		let i;
		if (typeof index === 'number') i = row;
		else i = super.indexOf(row);

		if (i < 0 || i >= this.height) return false;

		this.splice(i, 1);
		return true;
	}

	/**
	 * Searches the table for the given column, then returns its row and column.
	 * If the value can't be found, [-1, -1] is returned.
	 * @param {*} value to search for
	 * @param {*} column - only search a certain column
	 * @returns {Array} where [0] is the row index, and [1] is the column key
	 */
	indexOf(value, column) {
		for (let i = 0; i < this.height; i++) {
			const row = this[i]
			if (column) 
				if (row.get(column) == value) return [index, column];
			else for (let col in row) {
				if (row.get(col) == value) return [index, col];
			}
		}
		return [-1, -1];
	}

	/** @returns {*} value from the table at the specified location */
	get(row, column) {return this[row].get(column);}

	/**
	 * Sets the element at the given location. 
	 * @returns {Table} this
	 * @chainable
	 * @throws if the row or column doesn't exist
	 */
	set(row, column, value) {
		const tableRow = this[row];
		if (!tableRow) 
			throw RangeError('Row does not exist in table at index ' + row);
		if (!tableRow.has(column))
			throw RangeError('Column does not exist in table with key ' + column);
		tableRow.set(column, value);
		return this;
	}

	/**
	 * Adds an row to the end of the table
	 * @param {Map} row
	 * @returns {number} new length of the table
	 * @throws if the row's shape doesn't match the table
	 */
	push(row) {
		if (!test(row))
			throw TypeError('Row has different shape than the table, check its keys');
		return super.push(row);
	}

	/** @returns {Iterator} iterator for the table columns */
	keys() {return this[0].keys();}
	/** @returns {Array} table columns as an array */
	get columns() {return [...this.keys()];}
	/** @returns {number} length of keys in the table */
	get width() {return this[0].size}
	/** @returns {number} length of rows in the table. Alias for length. */
	get height() {return this.length}

	/** 
	 * Creates a blank row, but doesn't add it to the table, with keys 
	 * corresponding the the table's keys
	 * @param {*} [value=undefined]
	 * @returns {Map} an row filled with the given value 
	 */
	blank(value = undefined) {
		return new Map(Array.from(this.keys(), key => [key, value]));
	}

	/**
	 * Returns a segment of the table. Akin to Array.slice(), but in 2D
	 * @param {number} [beginRow]
	 * @param {number} [endRow]
	 * @param {number|Array|*} [beginColumn] - can pass a key or array of keys 
	 * to slice instead of a column index
	 * @param {number} [endColumn]
	 * @returns {Array<Map>}
	 */
	slice(beginRow = 0, endRow = this.height, 
	beginColumn = this.columns[0], endColumn = this.columns[this.width]) {
		let columns = [];
		if (typeof beginColumn !== 'number') {
			if (!Array.isArray(beginColumn)) columns.push(beginColumn);
			else columns = beginColumn;
		} else {
			let i = 0; 
			if (beginColumn < 0) i = this.width + beginColumn - 1;
			if (endColumn < 0) endColumn = this.width + endColumn;
			for (let key of this.keys()) {
				if (i >= beginColumn && i < endColumn) columns.push(key);
				i++;
			}
		}

		const rows = super.slice(beginRow, endRow);
		return rows.map(row => {
			let subset = [];
			row.forEach((value, key) => {
				if (columns.indexOf(key) > 0) subset.push([key, value])
			})
			return new Map(subset);
		})
	}

	/**
	 * Tests to ensure that the keys are all the same in the table rows.
	 * First checks that the rows are all the same size, then tests to ensure
	 * the rows have all the keys specified.
	 * @returns {boolean} true if test passed
	 */
	test(newRows) {
		const rows = this.concat(newRows);
		const sameSize = this.every(row => row.size === this.width);
		if (!sameSize) return false;
		else {
			return rows.every(row => {
				for (let key in this.keys()) 
					if (!row.has(key)) return false;
				return true;
			});
		}
	}

	toJSON() {
		return this.map(row => {
			let obj = Object.create(null);
			for (let [k, v] of row) {
				[k, v] = this.replacer([k, v]);
				if (!k.toString) {
					throw TypeError('key must have a toString function ' + 
						'to serialize into an object key');
				}
				obj[k.toString()] = v;
			}
			return obj;
		});
	}

	static parse(data) {
		if (typeof data === 'string') data = JSON.parse(data);
		return new this(data);
	}
}