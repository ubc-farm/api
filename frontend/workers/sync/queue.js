import idb from 'vendor/idb.js';

/**
 * Represents a queue of tasks. Some methods as based on the Java Queue object,
 * and the JavaScript Set object. The tasks are stored in IndexedDB, and this
 * queue is designed to be used to store HTTP requests for background syncing.
 * @module frontend/workers/sync/queue
 */
export default class Queue {
	/**
	 * @param {string} [STORE_NAME] - name of the queue objectStore
	 * @param {string} [DB_NAME] - name of the queue IndexedDB
	 * @param {boolean} [autoUpdate] automatically build key array from 
	 * existing object store
	 */
	constructor(STORE_NAME = 'queue', DB_NAME = 'ubc-farm', autoUpdate = true) {
		Object.assign(this, {STORE_NAME, DB_NAME});

		/**
		 * Keys are stored in this Set for local reference.
		 * @alias keys
		 * @memberof Queue
		 * @type {Set<number>}
		 */
		this.keys = new Set();
		if (autoUpdate) this.forceKeyUpdate();
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
			const operations = items.map(item => objStore.put(item));
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
		if (this.keys.delete(key) === undefined) return Promise.resolve(null);
		return dbRequest.then(db => {
			let tx = db.transaction(this.STORE_NAME, 'readwrite');
			let objStore = tx.objectStore(this.STORE_NAME);
			const value = objStore.get(key);
			objStore.delete(key);
			return Promise.all([value, tx.complete]);
		}).then(arr => arr[0]);
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
			let tx = db.transaction(this.STORE_NAME);
			this.keys.clear();
			tx.objectStore(this.STORE_NAME).iterateCursor(cursor => {
				if (!cursor) return;
				this.keys.add(cursor.value);
				cursor.continue();
			})
			return tx.complete.then(() => this.keys);
		})
	}

	/**
	 * Gets the values of the queue as a generator. If null is passed in the
	 * next() method, then the value will be deleted from the queue. If another
	 * value is passed, then the value will be updated in the queue. Both of these
	 * steps will cause the generator to pause at those commands, so you need to
	 * re-run next() later on to move forward. 
	 * IDBCursor isn't used because of the short transaction lifespan. 
	 * @returns {Generator}
	 */
	*values() {
		for (let key in this.keys) {
			let command = yield this.peek(key);
			if (command === null) {
				// delete the value
				yield this.poll(key);
			} else if (command !== undefined) {
				// update the value
				yield dbRequest.then(db => {
					return db.transaction(this.STORE_NAME).objectStore(this.STORE_NAME)
						.put(command, key);
				});
			} 
		}
	}

	/** Interator protocolor function */
	[Symbol.iterator]() {
		return this.values();
	}
}