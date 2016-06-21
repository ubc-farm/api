/** @file a Web Worker that manages an outbox for service workers */

importScripts('/vendor/idb.js');

/**
 * Don't open IndexedDB until first call
 * @returns {Promise<DB>}
 */
var IDB;
function getIdb() {
	if (!IDB) {
		IDB = idb.open('ubc-farm', 1, upgradeDB => {
			db.createObjectStore('outbox', {autoIncrement: true});
		});
	}
	return IDB;
}

self.onmessage = msg => {
	const respondKey = msg.data.id || null;
	getIdb().then(db => {
		let tx = db.transaction('outbox', 'readwrite');
		tx.objectStore('outbox').add(msg.data);
		return tx.complete;
	}).then(() => {
		self.postMessage(respondKey);
	})
}