import ObjectStore from './object-store.js';

export default class NetworkQueue extends ObjectStore {
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
	 */
	syncAt(key) {
		return this.get(key).then(({url, init}) => fetch(url, init))
		.then(res => {this.delete(key);	return res});
	}

	sync() {
		return this.getAllKeys().then(keys => keys.reduce(
			(last, key) => last.then(() => this.syncAt(key)),
			Promise.resolve()
		));
	}

	/**
	 * Add items to the queue
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
	 */
	push(url, init) {
		return super.add({url, init});
	}
}