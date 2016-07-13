import NetworkQueue from './network-queue.js';

/**
 * Alias for the fetch method
 * @param {string} path
 * @param {Object} [fetchOptions] - passed as fetch init
 * @param {string} [prefix=/api] - prefix for the path
 * @returns {Promise<Request>}
 * @alias module:lib/network.api
 */
export default function api(path = '', fetchOptions, prefix = '/api') {
	if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
	const url = prefix + '/' + path;

	return fetch(url, fetchOptions);
}

const queue = new NetworkQueue();
/**
 * Adds a request to the network queue and syncs it in the background.
 * If Background Sync api is present, then Service Workers will be used
 * to sync the data in the background.
 * @param {string} path
 * @param {Object} [fetchOptions] - passed as fetch init
 * @param {string} [prefix=/api] - prefix for the path
 * @returns {Promise<null>}
 * @alias module:lib/network.background
 */
export function background(path, fetchOptions, prefix = '/api') {
	if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
	const url = prefix + '/' + path;

	const status = queue.push(url, fetchOptions);
	
	if (!('serviceWorker' in navigator && 'SyncManager' in window)) 
		status.then(() => queue.sync());

	return status;
}