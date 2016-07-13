import idb from 'idb';

const defaultCallback = STORE_NAME => upgradeDB => {
	switch (upgradeDB.oldVersion) {
		case 0:
			upgradeDB.createObjectStore(STORE_NAME);
	}
}

/**
 * Convenience class for IndexedDB object store methods. 
 */
export default class ObjectStore {
	static get DB_VERSION() {return 1;}

	/**
	 * @param {string} STORE_NAME - name of object store
	 * @param {string} [DB_NAME] - name of the database
	 * @param {function} [upgradeCallback] - used to upgrade DB
	 */
	constructor(
		STORE_NAME, 
		DB_NAME = 'ubc-farm', upgradeCallback = defaultCallback(STORE_NAME)
	) {
		if (!STORE_NAME) throw TypeError('ObjectStore needs a store name');
		/** @const {string} STORE_NAME */
		/** @const {string} DB_NAME */
		Object.assign(this, {STORE_NAME, DB_NAME});

		/** @const {Promise<DB>} */
		this.dbPromise = idb.open(DB_NAME, ObjectStore.DB_VERSION, upgradeCallback);
	}

	/**
	 * @function count
	 * @memberof ObjectStore#
	 * @param {IDBKeyRange} [optionalKeyRange]
	 * @returns {Promise<number>}
	 */

	/**
	 * @function get
	 * @memberof ObjectStore#
	 * @param {K} key
	 * @returns {Promise<V>}
	 */

	/**
	 * @function getAll
	 * @memberof ObjectStore#
	 * @param {IDBKeyRange} [query]
	 * @param {number} [count]
	 * @returns {Promise<V[]>}
	 */

	/**
	 * @function getAllKeys
	 * @memberof ObjectStore#
	 * @param {IDBKeyRange} [query]
	 * @param {number} [count]
	 * @returns {Promise<K[]>}
	 */

	/**
	 * @function add
	 * @memberof ObjectStore#
	 * @param {V} item
	 * @param {K} [optionalKey]
	 * @returns {Promise<null>}
	 */

	/**
	 * @function clear
	 * @memberof ObjectStore#
	 * @returns {Promise<null>}
	 */

	/**
	 * @function delete
	 * @memberof ObjectStore#
	 * @param {K} recordKey
	 * @returns {Promise<undefined>}
	 */

	/**
	 * @function put
	 * @memberof ObjectStore#
	 * @param {V} item
	 * @param {K} [optionalKey]
	 * @returns {Promise<K>}
	 */
}

function alias(method, readstate) {
	return function(...args) {
		return this.dbPromise.then(db => db
			.transaction(this.STORE_NAME, readstate)
			.objectStore(this.STORE_NAME)[method](...args)
		);
	}
}

[
	['count'],
	['get'],
	['getAll'],
	['getAllKeys'],
	['add', 'readwrite'],
	['clear', 'readwrite'],
	['delete', 'readwrite'],
	['put', 'readwrite'],
]
.forEach(([m, r]) => ObjectStore.prototype[m] = alias(m, r));