import knex from 'knex';

function databaseHandler(tableName, method = 'select', modifier = (query)=>{}) {
	return function(request, reply) {
		const {params: {id, property}, query: {print, shallow}} = request;
		const query = knex(tableName).modify(modifier)
			.modify(withParams, table, {id, property})
		if (id) query.where({id});
		if (property) query.columns(property);
		query[method]().reduce((obj, row) => {
			obj[row.id] = row;
			return obj;
		}, {})
		
		// if flagged as shallow, transform non-primitive keys into 'true'
		.then(json => { 
			if (query.shallow) {
				json = json.map(data => {
					for (let key in data) {
						const value = data[key];
						if (typeof value !== 'string' && typeof value !== 'undefined'
						&& typeof value !== 'number' && typeof value !== 'boolean') {
							data[key] = true;
						}
					}
					return data;
				})
			}
			return json;
		})
		
		// if an ID is specified, return just that single object.
		// if a property is also specified, return the value of that property
		.then(json => {
			if (id) {
				const single = json[id];
				if (property) return single[property];
				else return single;
			} 
			else return json;
		})

		// Return a 204 response if flagged to print silent
		.then(data => {
			if (print === 'silent') return request.generateResponse().code(204);
			else return data;
		});

		let response = reply(query);
		if (print === 'pretty') response.spaces(2);
		return response;
	};
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
		//get api json (read data)
		case 'get': 
			return databaseHandler(table);
			break;
		case 'post' //FOR API: add object without a set id (push data)
		case 'put' //add a api json without touching the rest (write data)
		case 'delete' //delete an api json without touching the rest (remove data)
		case 'options'
		case 'patch' //update data
	}

	return function(request, reply) {
		const {id, columns} - request.params;

		let query = knex.clone();
		if (id) query = query.where({id});
		query = query.select(...properties);
		

		return reply('new handler: ' + options.msg);
	}
}

{
	method: 'GET',
	path: '/api/{tableName}/{id?}/{property?}',
	handler: {
		api: {

		}
	}
}