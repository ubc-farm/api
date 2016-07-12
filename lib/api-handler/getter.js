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
		const {query: {print, shallow}} = request;
		const silentPrintFlag = print === 'silent', 
			prettyPrintFlag = print === 'pretty';
		const shallowFlag = shallow || false;

		let query = Model.query();
		if (id) {
			query = query.findById(id).then(item => {
				if (property) return item[property];
				else return item;
			})
		} else {
			query = query.then(list => arrayToObjectMap(list, Model.idColumn));
		} 

		query
		.then(json => shallowTransform(json, shallowFlag))
		.then(data => silentTransform(request, data, silentPrintFlag))
		return prettyPrint( reply(query), prettyPrintFlag );
	}
}