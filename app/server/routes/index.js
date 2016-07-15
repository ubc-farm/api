import staticRoutes from './static.js';
import markoRoutes from './marko.js';
import reactRoutes from './react.js';
import apiRoutes from './api.js';
import calendarRoute from './calendar.js';

/**
 * Exports routes an an array of route configurations
 * @module backend/routes
 * @type {Object[]}
 */
const routes = [
	...calendarRoute,
	...staticRoutes,
	...markoRoutes,
	...reactRoutes,
	...apiRoutes
];
export default routes;