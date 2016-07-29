
export const tape = {
	method: 'GET',
	path: '/packages/tape{ext?}',
	handler: {
		file: {
			confine: false,
			path: 'tape/index.js',
			lookupCompressed: false //@todo gzip
		}
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
	path: '/packages/jsts{ext?}',
	handler: {
		package: {
			entry: 'jsts/index.js',
			moduleName: 'jsts'
		}
	}
}