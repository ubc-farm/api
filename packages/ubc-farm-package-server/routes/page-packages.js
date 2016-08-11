import directoryConfig from '../../ubc-farm-page-directory/rollup.config.js';
import invoiceConfig from '../../ubc-farm-page-invoice/rollup.config.js';
import calendarConfig from '../../ubc-farm-page-calendar/rollup.config.js';
import tableConfig from '../../react-table/rollup.config.js';
import plannerConfig from '../../ubc-farm-page-planner/rollup.config.js';
import mapEditorConfig from '../../ubc-farm-page-map-editor/rollup.config.js';
import fieldsConfig from '../../ubc-farm-page-fields/rollup.config.js';

const packageRoutes = (pageName, config) => [
	{
		method: 'GET',
		path: `/packages/ubc-farm-page-${pageName}/index.js`,
		handler: {
			package: Object.assign({}, config, {
				entry: `ubc-farm-page-${pageName}/index.js`,
				moduleName: 'TEST'
			})
		}
	},
	{
		method: 'GET',
		path: `/packages/ubc-farm-page-${pageName}.js`,
		handler: (req, reply) => 
			reply().redirect(`/packages/ubc-farm-page-${pageName}/index.js`)
	},
	{
		method: 'GET',
		path: `/packages/ubc-farm-page-${pageName}/{param*}`,
		handler: {
			directory: { path: `ubc-farm-page-${pageName}` }
		}
	}
];

export const directory = packageRoutes('directory', directoryConfig);
export const invoice = packageRoutes('invoice', invoiceConfig);
export const calendar = packageRoutes('calendar', calendarConfig);
export const planner = packageRoutes('planner', plannerConfig);
export const mapEditor = packageRoutes('map-editor', mapEditorConfig);
export const fields = packageRoutes('fields', fieldsConfig);

export const table = {
	method: 'GET',
	path: '/packages/react-table/index.js',
	handler: {
		package: Object.assign({}, tableConfig, {
			entry: 'react-table/index.js',
			moduleName: 'Table'
		})
	}
}
export const tableFiles = {
	method: 'GET',
	path: '/packages/react-table/{param*}',
	handler: {
		directory: { path: 'react-table' }
	}
}

export const utils = {
	method: 'GET',
	path: '/packages/ubc-farm-utils/index.js',
	handler: {
		package: {
			entry: 'ubc-farm-utils/index.js',
			moduleName: 'Utils',
			sourceMap: true
		}
	}
}

export const fieldsMap = {
	method: 'GET',
	path: '/packages/ubc-farm-page-fields/map.js',
	handler: {
		package: Object.assign({}, fieldsConfig, {
			entry: 'ubc-farm-page-fields/map/index.js',
			moduleName: 'FieldMap'
		})
	}
}

export const editorWorker = {
	method: 'GET',
	path: '/packages/ubc-farm-page-map-editor/autogrid/worker.js',
	handler: {
		file: 'ubc-farm-page-map-editor/autogrid/index.es.js'
	}
}