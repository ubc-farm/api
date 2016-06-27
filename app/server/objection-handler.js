import knex from 'knex';
import {objectArrayToObject} from 'lib/utils';

//EXAMPLE_PATH = '/api/{tableName}/{id?}/{property?}'

/**
 * Transform non-primitive keys in the object to 'true'
 * @param {Object} json
 * @returns {Object}
 */
function shallowTransform(json) {
	for (let key in json) {
		const value = json[key];
		if (typeof value !== 'string' && typeof value !== 'undefined'
		&& typeof value !== 'number' && typeof value !== 'boolean') {
			json[key] = true;
		}
	}
	return json;
}

/**
 * Returns a 204 response
 */
function silentTransform(request) {
	return request.generateResponse().code(204);
}

/**
 * @param {Object} route public interface object
 * @param {Object} options configuration object
 */
export default function handler(route, options) {
	const Model = options.model;
	switch(route.method.toLowerCase()) {
		case 'get': 
			return function(request, reply) {
				const {params: {id, property}, query: {print, shallow}} = request;
				let query = Model.query();
				if (id) query.findById(id);

				query.then(objectArrayToObject)
				.then(json => shallow ? shallowTransform(json) : json)
				.then(obj => {
					if (id) {
						if (property) return obj[id][property];
						else return obj[id];
					}
					else return obj;
				})
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
		case 'post':
			return function(request, reply) {
				const {payload, query: {print}} = request;
				const query = Model.query().insert(payload)
				.then(inserted => ({ id: inserted[Model.idColumn] }))
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
		case 'delete':
			return function(request, reply) {
				const {params: {id, property}} = request;
				let query = Model.query();

				if (property) {
					query.patchAndFetchById(id, { [property]: null })
				} else {
					query.deleteById(id);
				}
				query.then(() => null);

				return reply(query);
			};
		case 'put':
		case 'patch':
			return function(request, reply) {
				const {payload, params: {id, property}, query: {print, shallow}} =
					request;
				let query = Model.query();

				if (property) {
					query.patchAndFetchById(id, { [property]: payload })
				} else {
					const method = route.method.toLowerCase() === 'patch' 
						? 'patchAndFetchById'
						: 'updateAndFetchById'
					query[method](id, payload);
				}
				
				.then(json => shallow ? shallowTransform(json) : json)
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
	}
}