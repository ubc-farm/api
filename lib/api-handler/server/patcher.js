import {
	shallowTransform, 
	silentTransform, 
	prettyPrint
} from './utils.js';

export default function patcher(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {payload, params: {id, property}} = request;
		const {query: {print, shallow: shallowFlag}} = request;
		const silentPrintFlag = print === 'silent', 
			prettyPrintFlag = print === 'pretty';
		
		const query = Model.query();
		if (property) 
			query.patchAndFetchById(id, { [property]: payload })
		else {
			const routeMethod = route.method.toLowerCase();
			let queryMethod = ''; 
			if (routeMethod === 'patch') queryMethod = 'patchAndFetchById';
			else if (routeMethod === 'put') queryMethod = 'updateAndFetchById';
			query[queryMethod](id, payload);
		}
		
		query
		.then(json => shallowTransform(json, shallowFlag))
		.then(data => silentTransform(request, data, silentPrintFlag))
		return prettyPrint( reply(query), prettyPrintFlag );
	}
}