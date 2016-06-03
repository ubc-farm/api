/**
 * Represents a queue of taks
 * @module
 */
export default class Queue {
	constructor() {
		
	}
	
	static get DB_VERSION() {return 1;}
	get DB_NAME() {return 'queue-db';}
	get STORE_NAME() {return 'queue';}
	
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
	open(callbacks, readonly = false) {
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
		return this.open([objectStore => {
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
		return this.open([objectStore => {
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
	
	* [Symbol.iterator]() {
		
	}
}