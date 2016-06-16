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
	}
	static get DB_VERSION() {return 1;}

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
			let objStore = db.transaction(this.STORE_NAME, 'readwrite')
				.objectStore(this.STORE_NAME);
			let operations = items.map(item => objStore.add(item));
			return Promise.all([tx.complete, ...operations]);
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
	 * @returns {null} if queue is empty
	 * @returns {any} the head item
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	peek() {

	}

	/**
	 * Retrives and removes the head of the queue.
	 * @returns {null} if the queue is empty.
	 * @returns {any} the head item
	 * @throws {Promise<Error>} rejects if transaction aborts or errors
	 */
	poll() {
		this.peek();
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
	 * Gets the values of the queue as a generator
	 * @returns {Generator}
	 */
	*values() {

	}

	/** Alias for Queue.values() to use with for...of */
	[Symbol.iterator]() {
		return this.values();
	}
	
	/**
	 * @callbacks Queue~promiseCallback
	 * @param {IDBObjectStore}
	 */
	
	/**
	 * Creates a transaction with an indexedDb.
	 * Once ready, the callbacks are called with the object store. 
	 * After the transactions finish, open resolves
	 * with the transaction results.
	 * @param {Queue~promiseCallback[]} callbacks 
	 * @param {boolean} [readonly] - set true to only read, not write
	 * @returns {Promise}
	 */
	oldOpen(callbacks, readonly = false) {
		let mode = readonly ? 'readonly' : 'readwrite';
		return new Promise((resolve, reject) => {
			let request = indexedDB.open(this.DB_NAME, Queue.DB_VERSION);
			request.onerror = e => {
				reject(e.target.errorCode);
			};
			request.onupgradeneeded = e => {
				let objectStore = e.target.result.createObjectStore(this.STORE_NAME, {
					autoIncrement: true
				});
			}
			
			request.onsuccess = e => {
				let transaction = db.transaction(this.STORE_NAME, mode);
				
				let objectStore = transaction.objectStore(this.STORE_NAME);
				let result = Promise.all(callbacks.map(cb => {
					return cb(objectStore)
						.catch(e => {error = e})
						.then(r => {result = r})
				}));
				
				transaction.oncomplete = e => {resolve(result)};
				transaction.onerror = e => {reject(e.target.errorCode)};
			};
		})
	}
	
	/**
	 * Adds an item to the queue
	 * @returns {Promise<number>} the new length of the queue
	 */
	enqueue(item) {
		return this.oldOpen([objectStore => {
			return new Promise((resolve, reject) => {
				let request = objectStore.add(item);
				request.onerror = e => {reject(request.error)};
				request.onsuccess = e => {
					let count = objectStore.count();
					count.onerror = e => {reject(count.result)};
					count.onsuccess = e => {resolve(count.result)}
				};
			})
		}]);
	}
	
	/**
	 * Returns and deletes the first item in the queue.
	 * @param {boolean} [reverse] - get the last item instead
	 * @returns {Promise} the item
	 */
	dequeue(reverse = false) {
		return this.oldOpen([objectStore => {
			return new Promise((resolve, reject) => {
				let request = objectStore.openCursor(null, reverse? 'prev': null);
				request.onerror = e => {reject(request.error)};
				request.onsuccess = e => {
					let cursor = e.target.result;
					if (cursor) {
						resolve(cursor.value);
						cursor.delete();
					}
				};
			})
		}]);
	}
	
	/**
	 * Creates a generator that flips through the values
	 * in the Object Store.
	 * @param {boolean} reverse - sort desending instead of ascending.
	 * @returns {Generator}
	 */
	* OldValues(reverse = false) {
		this.oldOpen([objectStore => {
			return new Promise((resolve, reject) => {
				let request = objectStore.openCursor(null, reverse? 'prev': null);
				request.onerror = e => {reject(request.error)};
				request.onsuccess = e => {
					let cursor = e.target.result;
					if (cursor) {
						let newValue = yield cursor.value;
						if (newValue !== undefined) {
							cursor.update(newValue);
						}
						cursor.continue();
					} else {
						resolve();
					}
				};
			})
		}])
	}
}