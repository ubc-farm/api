/**
 * Represents a queue of taks
 * @module
 */

import {Deferred} from 'utils.js';

export default class Queue {
	constructor() {
		
	}
	
	static get DB_VERSION() {return 1;}
	get DB_NAME() {return 'queue-db';}
	get STORE_NAME() {return 'queue';}
	
	open(callbackPromise, readonly = false) {
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
				
				let result, error;
				transaction.oncomplete = e => {
					if (error != null) reject(error);
					else resolve(result);
				};
				transaction.onerror = e => {reject(e.target.errorCode)};
				
				let objectStore = transaction.objectStore(this.STORE_NAME);
				callbackPromise(objectStore)
					.catch(e => {error = e})
					.then(r => {result = r})
			};
		})
	}
	
	enqueue(item) {
		return this.open(objectStore => {
			return new Promise((resolve, reject) => {
				let request = objectStore.add(item);
				transaction.oncomplete = e => {resolve(e.target)};
				transaction.onerror = e => {reject(e.target.errorCode)};
			})
		});
	}
	
	dequeue() {
		
	}
	
	* [Symbol.iterator]() {
		
	}
}