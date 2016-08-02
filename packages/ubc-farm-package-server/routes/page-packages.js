import directoryConfig from '../../ubc-farm-page-directory/rollup.config.js';
export const directory = {
	method: 'GET',
	path: '/packages/ubc-farm-page-directory.js',
	handler: {
		package: Object.assign({}, directoryConfig, {
			entry: 'ubc-farm-page-directory/index.js'
		})
	}
}

export const directoryFiles = {
	method: 'GET',
	path: '/packages/ubc-farm-page-directory/{param*}',
	handler: {
		directory: { path: 'ubc-farm-page-directory' }
	}
}

import invoiceConfig from '../../ubc-farm-page-invoice/rollup.config.js';
export const invoice = {
	method: 'GET',
	path: '/packages/ubc-farm-page-invoice.js',
	handler: {
		package: Object.assign({}, invoiceConfig, {
			entry: 'ubc-farm-page-invoice/index.js'
		})
	}
}

export const invoiceFiles = {
	method: 'GET',
	path: '/packages/ubc-farm-page-invoice/{param*}',
	handler: {
		directory: { path: 'ubc-farm-page-invoice' }
	}
}

import calendarConfig from '../../ubc-farm-page-calendar/rollup.config.js';
export const calendar = {
	method: 'GET',
	path: '/packages/ubc-farm-page-calendar.js',
	handler: {
		package: Object.assign({}, calendarConfig, {
			entry: 'ubc-farm-page-calendar/index.js'
		})
	}
}

export const calendarFiles = {
	method: 'GET',
	path: '/packages/ubc-farm-page-calendar/{param*}',
	handler: {
		directory: { path: 'ubc-farm-page-calendar' }
	}
}

import tableConfig from '../../react-table/rollup.config.js';
export const table = {
	method: 'GET',
	path: '/packages/react-table.js',
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
	path: '/packages/ubc-farm-utils.js',
	handler: {
		package: {
			entry: 'ubc-farm-utils/index.js',
			moduleName: 'Utils',
			sourceMap: true
		}
	}
}