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
 * Called by knex.modify
 * @param {QueryBuilder} queryBuilder
 * @param {string} tableName - table to get results from
 * @param {Object} params
 * @param {string} [params.id]
 * @param {string} [params.property]
 */
function withParams(queryBuilder, tableName, {id, property}) {
	queryBuilder.table(tableName);
	if (id) queryBuilder.where({id});
	if (property) queryBuilder.columns(property);
}

/**
 * @param {Object} route public interface object
 * @param {Object} options configuration object
 */
export default function handler(route, options) {
	const {table} = options;

	switch(route.method.toLowerCase()) {
		case 'get': 
			return function(request, reply) {
				const {params: {id, property}, query: {print, shallow}} = request;
				let query = knex(table).select(property);
				if (id) query.where({id});

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
				const query = knex(table).insert(payload, 'id')
				.then(id => ({ id }))
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
		case 'put':
			return function(request, reply) {
				const {payload, params: {id, property}, query: {print, shallow}} =
					request;
				let query = knex(table);

				if (property) {
					query.where({id})
						.returning(property)
						.update({ [property]: payload })
						.then(data => {
							if (data.length === 1) return { [property]: data[0] };
							else throw Error();
						});
				} else {
					payload.id = id;
					query.insert(payload).then(() => payload);
				}
				
				.then(json => shallow ? shallowTransform(json) : json)
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
		case 'delete':
			return function(request, reply) {
				const {params: {id, property}} = request;
				let query = knex(table);

				if (property) {
					query.where({id}).update({ [property]: null });
				} else {
					query.where({id}).del();
				}
				query.then(() => null);

				return reply(query);
			};
		case 'patch':
		//TODO: simplify since the only difference between patch and put is using
		//update instead of insert/replace
			return function(request, reply) {
				const {payload, params: {id, property}, query: {print, shallow}} =
					request;
				let query = knex(table);

				if (property) {
					query.where({id})
						.returning(property)
						.update({ [property]: payload })
						.then(data => {
							if (data.length === 1) return { [property]: data[0] };
							else throw Error();
						});
				} else {
					payload.id = id;
					query.update(payload).then(() => payload);
				}
				
				.then(json => shallow ? shallowTransform(json) : json)
				.then(data => print === 'silent' ? silentTransform(request) : data)

				let response = reply(query);
				if (print === 'pretty') response.spaces(2);
				return response;
			};
	}
}