import {resolve} from 'path';

export const tape = {
	method: 'GET',
	path: '/packages/tape{ext?}',
	handler: {
		file: resolve(__dirname, '../../tape/index.js')
	}
}

export const react = {
	method: 'GET',
	path: '/packages/react{ext?}',
	handler: (req, reply) => reply().redirect('https://fb.me/react-15.2.1.js')
}

export const react_dom = {
	method: 'GET',
	path: '/packages/react-dom{ext?}',
	handler: (req, reply) => reply().redirect('https://fb.me/react-dom-15.2.1.js')
}

export const jsts = {
	method: 'GET',
	path: '/package/jsts{ext?}',
	handler: {
		package: {
			entry: resolve(__dirname, '../../jsts/index.js'),
			moduleName: 'jsts'
		}
	}
}