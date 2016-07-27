import staticRoutes from './static.js';
import markoRoutes from './marko.js';
import reactRoutes from './react.js';
import apiRoutes from './api.js';
import calendarRoute from './calendar.js';
import directoryRoute from './directory.js';
import financeRoutes from './finance.js';
import styleRoutes from './css-subsections.js'

/**
 * Exports routes an an array of route configurations
 * @module backend/routes
 * @type {Object[]}
 */
export default [
	...calendarRoute,
	directoryRoute,
	...financeRoutes,
	...staticRoutes,
	...markoRoutes,
	...reactRoutes,
	...apiRoutes,
	...styleRoutes
];