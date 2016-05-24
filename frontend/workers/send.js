/**
 * Don't open IndexedDB until first call
 * @returns {Promise<DB>}
 */
let IDB;
function getIdb() {
	if (!IDB) {
		IDB = idb.open('ubc-farm', 1, upgradeDB => {
			db.createObjectStore('outbox', {autoIncrement: true});
		});
	}
	return IDB;
}

/**
 * Sends out all the outbox data
 */
var send = function() {
	return getIdb().then(db => {
		return db.transaction('outbox', 'readwrite').objectStore('outbox').getAll();
	})
	.then(objs => objs.map(JSON.stringify))
	.then(jsons => {return Promise.all(jsons.map((json => {
		return fetch(r.url, {method: 'POST', body: r})
	})))})
	.then(() => {
		return idb.delete('ubc-farm');
	})
}