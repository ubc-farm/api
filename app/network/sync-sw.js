import NetworkQueue from './network-queue.js';

/**
 * Listens for sync events. One sync is scheduled per tag,
 * so tags such as 'clear-outbox' can be used freely and will only
 * run once when the user regains their connection. The tags are also
 * used as the objectStore names for the queue database.
 */
self.addEventListener('sync', e => {
	e.waitUntil(new NetworkQueue(e.tag).sync());
})