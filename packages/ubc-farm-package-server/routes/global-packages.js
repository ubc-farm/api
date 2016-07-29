
export const tape = {
	method: 'GET',
	path: '/packages/tape.js',
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
	path: '/packages/react.js',
	handler: (req, reply) => reply().redirect('https://fb.me/react-15.2.1.js')
}

export const react_dom = {
	method: 'GET',
	path: '/packages/react-dom.js',
	handler: (req, reply) => reply().redirect('https://fb.me/react-dom-15.2.1.js')
}

export const jsts = {
	method: 'GET',
	path: '/packages/jsts.js',
	handler: {
		package: {
			entry: 'jsts/index.js',
			moduleName: 'jsts'
		}
	}
}