import getter from './getter.js';
import poster from './poster.js';
import deleter from './deleter.js';
import patcher from './patcher.js';

export default function handler(route, options) {
	switch(route.method.toLowerCase()) {
		case 'get': return getter(route, options);
		case 'post': return poster(route, options);
		case 'delete': return deleter(route, options);
		case 'put': case 'patch':	
			return patcher(route, options);
	}
}