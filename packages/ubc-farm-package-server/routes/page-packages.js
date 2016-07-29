import directoryConfig from '../../ubc-farm-page-directory/rollup.config.js';
export const directory = {
	method: 'GET',
	path: '/packages/ubc-farm-page-directory{ext?}',
	handler: {
		package: Object.assign({}, directoryConfig, {
			entry: 'ubc-farm-page-directory/index.js'
		})
	}
}

import invoiceConfig from '../../ubc-farm-page-invoice/rollup.config.js';
export const invoice = {
	method: 'GET',
	path: '/packages/ubc-farm-page-invoice{ext?}',
	handler: {
		package: Object.assign({}, invoiceConfig, {
			entry: 'ubc-farm-page-invoice/index.js'
		})
	}
}