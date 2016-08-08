
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
	handler: (req, reply) => reply().redirect('https://fb.me/react-15.3.0.js')
}

export const react_dom = {
	method: 'GET',
	path: '/packages/react-dom.js',
	handler: (req, reply) => reply().redirect('https://fb.me/react-dom-15.3.0.js')
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

export const momemt = {
	method: 'GET',
	path: '/packages/moment.js',
	handler: (req, reply) => 
		reply().redirect('http://momentjs.com/downloads/moment.js')
}

export const timeline = {
	method: 'GET',
	path: '/packages/vis-timeline.js',
	handler: {
		file: 'vis-timeline/index.iife.js'
	}
}
export const timelineFiles = {
	method: 'GET',
	path: '/packages/vis-timeline/{param*}',
	handler: {
		directory: { path: 'vis-timeline/dist' }
	}
}