import {resolve, join} from 'path';

const packageFolder = resolve(__dirname, '../../');

import directoryConfig from '../../ubc-farm-directory/rollup.config.js';
export const directory = {
	method: 'GET',
	path: '/packages/ubc-farm-directory{ext?}',
	handler: {
		package: Object.assign({}, directoryConfig, {
			entry: join(packageFolder, 'ubc-farm-directory/index.js')
		})
	}
}

import invoiceConfig from '../../ubc-farm-invoice/rollup.config.js';
export const invoice = {
	method: 'GET',
	path: '/packages/ubc-farm-invoice{ext?}',
	handler: {
		package: Object.assign({}, invoiceConfig, {
			entry: join(packageFolder, 'ubc-farm-invoice/index.js')
		})
	}
}