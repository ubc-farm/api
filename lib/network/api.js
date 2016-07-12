import NetworkQueue from './network-queue.js';

/**
 * Alias for the fetch method
 * @returns {Promise<Request>}
 */
export default function api(path = '', fetchOptions, prefix = '/api') {
	if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
	const url = prefix + '/' + path;

	return fetch(url, fetchOptions);
}

const queue = new NetworkQueue();
export function background(path, fetchOptions, prefix = '/api') {
	if (prefix.endsWith('/')) prefix = prefix.slice(0, -1);
	const url = prefix + '/' + path;

	const status = queue.push(url, fetchOptions);
	
	if (!('serviceWorker' in navigator && 'SyncManager' in window)) 
		status.then(() => queue.sync());

	return status;
}