import * as pagePackages from './page-packages.js';

function getRoutesFromModule(mod) {
	return Object.keys(mod).map(ex => mod[ex]);
}

export default [
	...getRoutesFromModule(pagePackages)
];