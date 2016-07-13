import ObjectStore from './object-store.js';

/**
 * Used to store planned fetch requests in IndexedDB, then retrive them
 * in order at a later point. 
 * @extends module:lib/network.ObjectStore
 * @alias module:lib/network.NetworkQueue
 */
export default class NetworkQueue extends ObjectStore {
	/**
	 * @param {string} [STORE_NAME]
	 * @param {string} [DB_NAME]
	 */
	constructor(STORE_NAME = 'queue', DB_NAME = 'ubc-farm') {
		super(STORE_NAME, DB_NAME, db => {
			switch (db.oldVersion) {
				case 0:
					db.createObjectStore(STORE_NAME, {autoIncrement: true});
			}
		})
	}

	/**
	 * Try sending the network request tied to the given key
	 * @param {K} key
	 * @returns {Promise<Response>}
	 */
	syncAt(key) {
		return this.get(key).then(({url, init}) => fetch(url, init))
		.then(res => {this.delete(key);	return res});
	}

	/**
	 * Tries to sync all the pending requests. A response is awaited from the 
	 * previous request before beginning the next one.
	 * @returns {Promise<Response>} the last response from the queue
	 */
	sync() {
		return this.getAllKeys().then(keys => keys.reduce(
			(last, key) => last.then(() => this.syncAt(key)),
			Promise.resolve()
		));
	}

	/**
	 * Add items to the queue
	 * @param {...Object} items
	 * @returns {Promise<Array>}
	 */
	add(...items) {
		return this.dbPromise.then(db => {
			const tx = db.transaction(this.STORE_NAME, 'readwrite');
			const objectStore = tx.objectStore(this.STORE_NAME);
			
			return Promise.all([
				tx.complete,
				...items.map(item => objectStore.add(item))
			]);
		}).then(([, ...addResults]) => addResults);
	}

	/**
	 * Add a single fetch to the queue
	 * @param {string} url
	 * @param {Object} init passed to fetch
	 */
	push(url, init) {
		return super.add({url, init});
	}
}