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
		
		let query = Model.query();
		if (property) 
			query.patchAndFetchById(id, { [property]: payload })
		else {
			let queryMethod = '', routeMethod = route.method.toLowerCase();
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