import {
	shallowTransform, 
	silentTransform, 
	prettyPrint
} from './utils.js';
import {arrayToObjectMap} from 'lib/utils';

export default function getter(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {params: {id, property}} = request;
		const {query: {print, shallow: shallowFlag}} = request;
		const silentPrintFlag = print === 'silent', 
			prettyPrintFlag = print === 'pretty';

		let query = Model.query();
		if (id) {
			query.findById(id).then(item => {
				if (property) return item[property];
				else return item;
			})
		} else {
			query.then(list => arrayToObjectMap(list, Model.idColumn));
		} 

		query
		.then(json => shallowTransform(json, shallowFlag))
		.then(data => silentTransform(request, data, silentPrintFlag))
		return prettyPrint( reply(query), prettyPrintFlag );
	}
}