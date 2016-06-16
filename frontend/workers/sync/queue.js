import idb from 'vendor/idb.js';

/**
 * Represents a queue of tasks. Some methods as based on the Java Queue object,
 * and the JavaScript Set object. The tasks are stored in IndexedDB, and this
 * queue is designed to be used to store HTTP requests for background syncing.
 * @module
 */
export default class Queue {
	/**
	 * @param {string} [STORE_NAME] - name of the queue objectStore
	 * @param {string} [DB_NAME] - name of the queue IndexedDB
	 */
	constructor(STORE_NAME = 'queue', DB_NAME = 'ubc-farm') {
		Object.assign(this, {STORE_NAME, DB_NAME});

		/**
		 * Keys are stored in this Set for local reference.
		 * @alias keys
		 * @memberof Queue
		 * @type {Set<number>}
		 */
		this.keys = new Set();
	}
	static get DB_VERSION() {return 1;}

	/** 
	 * Gets the first key of the Set 
	 * @type {number}
	 */
	get topKey() {
		for (var key of this.keys) break;
		return key;
	}

	/** @const {Promise<DB>} */
	get dbRequest() {
		return idb.open(this.DB_NAME, Queue.DB_VERSION, upgradeDB => {
			switch (upgradeDB.oldVersion) {
				case 0:
					upgradeDB.createObjectStore(this.STORE_NAME, {
						autoIncrement: true
					});
					break;
			}
		})
	}

	/**
	 * Inserts all given values into the Queue. Objects are inserted in the order 
	 * provided, so the final value will become the last element of the queue.
	 * @param {...any} items
	 * @return {Promise} resolves upon success
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	add(...items) {
		return dbRequest.then(db => {
			let tx = db.transaction(this.STORE_NAME, 'readwrite');
			let objStore = tx.objectStore(this.STORE_NAME);
			//put is used because it returns the new key of the object.
			//as far as I can tell from documentation, add does not return the key.
			let operations = items.map(item => objStore.put(item));
			return Promise.all([tx.complete, ...operations]);
		})
		//get rid of the tx.complete value
		.then(results => { results.shift(); return results;	})
		//push the keys from put() into the Queue.keys() array
		.then(keys => {
			keys.reduce((keySet, value) => {
				return keySet.add(value);
			}, this.keys);
		})
	}
	
	/** 
	 * Removes all items in the Queue. Clearing is done on a seperate thread.
	 * @returns {Promise} resolves once clearing is done
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	clear() {
		return dbRequest.then(db => {
			return db.transaction(this.STORE_NAME, 'readwrite')
				.objectStore(this.STORE_NAME).clear();
		})
	}

	/**
	 * Retrives, but does not remove, the head of the queue.
	 * @param {number} [key] - set the key manually
	 * @returns {Promise<null>} if queue is empty
	 * @returns {Promise<any>} the head item
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	peek(key = this.topKey) {
		if (this.keys.size === 0) return Promise.resolve(null);
		return dbRequest.then(db => {
			return db.transaction(this.STORE_NAME)
				.objectStore(this.STORE_NAME).get(key);
		})
	}

	/**
	 * Retrives and removes the head of the queue.
	 * @param {number} [key] - set the key manually
	 * @returns {Promise<null>} if the queue is empty.
	 * @returns {Promise<any>} the head item
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	poll(key = this.topKey) {
		let deletion = this.keys.delete(key);
		if (deletion === undefined) return Promise.resolve(null);
		return dbRequest.then(db => {
			let tx = db.transaction(this.STORE_NAME, 'readwrite');
			let objStore = tx.objectStore(this.STORE_NAME);
			let value = objStore.get(key);
			objStore.delete(key);
			return tx.complete;
		})
	}

	/**
	 * Returns the amount of items in the queue.
	 * @returns {Promise<number>} count
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	size() {
		return dbRequest.then(db => {
			return db.transaction(this.STORE_NAME).objectStore(this.STORE_NAME)
				.count();
		})
	}

	/**
	 * Rewrites the Queue.keys Set using the keys from the IndexedDB.
	 * @returns {Set<number>} the updated set
	 */
	forceKeyUpdate() {
		return dbRequest.then(db => {
			return db.transaction(this.STORE_NAME).objectStore(this.STORE_NAME)
				.getAllKeys();
		}).then(newKeys => {
			this.keys.clear();
			return newKeys.reduce((set, value) => {
				return set.add(value);
			}, this.keys)
		})
	}
	 * @returns {Generator}
	 */
	*values() {

	}

	/** Alias for Queue.values() to use with for...of */
	[Symbol.iterator]() {
		return this.values();
	}
}