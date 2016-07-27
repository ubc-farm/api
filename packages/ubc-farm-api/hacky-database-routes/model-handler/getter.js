import {transformReply, arrayToObjectMap, removeNullandUndef} from './utils.js';

export default function getter(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {params: {id, property}} = request;

		let query = Model.query();
		if (id) {
			query = query
				.findById(id)
				.then(item => {
					if (property) return item[property];
					else return item;
				});
		} else {
			query = query
				.then(list => arrayToObjectMap(list, Model.idColumn))
				.then(json => removeNullandUndef(json));
		} 

		return transformReply(query, request, reply);
	}
}