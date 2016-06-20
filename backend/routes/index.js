import staticRoutes from './static.js';
import markoRoutes from './marko.js';

/**
 * Exports routes an an array of route configurations
 * @module backend/routes
 * @type {Object[]}
 */
const routes = [
	...staticRoutes,
	...markoRoutes
];
export default routes;