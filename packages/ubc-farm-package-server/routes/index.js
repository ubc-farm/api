import * as globalPackages from './global-packages.js';
import * as pagePackages from './page-packages.js';

function* RoutesFromModule(mod) {
	for (const exportName in mod) {
		const exports = mod[exportName];
		if (Array.isArray(exports)) 
			for (const route of exports) yield route;
		else
			yield exports;
	}
}

export default [
	...RoutesFromModule(globalPackages),
	...RoutesFromModule(pagePackages)
];