import modify from './modify.js'
import {post} from './post.js'

/**
 * Create a new object with the given ID
 * @param {Request} request
 * @param {string} request.params.id
 * @param {Object} request.payload - object to insert
 * @param {Reply} reply
 * @this {Model} model from objection.js
 * @returns {Reply<Object>} 
 */
function put(request, reply) {
	const {id} = request.params;
	request.payload[this.idColumn] = id;
	return post.call(this, request, reply);
}

/**
 * Query a single row then return that row, or a property of that row.
 * @param {Request} request
 * @param {string} request.params.id
 * @param {string} request.params.property
 * @param {Reply} reply
 * @this {Model} model from objection.js
 * @returns {Reply<Object|*>} either the row as JSON, 
 * or the specific property value.
 */
function putProp(request, reply) {
	const {id, property} = request.params;

	

	let query = this.query().findById(id);
	if (property) {
		query.column(property);
		var promise = query.then(row => row[property]);
	} else 
		var promise = query.execute();
	return modify(promise, request, reply);
}

/**
 * Creates route for API get requests
 * @param {Model} model to use to acquire the SQL data
 * @returns {Route[]}
 */
export default function putRoute(model) {
	if (!model.label) model.label = model.tableName.toLowerCase() + 's';
	const route = {
		method: 'PUT',
		config: {
			bind: Model
		}
	}

	return [
		Object.assign({}, route, {
			path: '/api/' + model.label + '/{id}.json',
			handler: put
		}),
		Object.assign({}, route, {
			path: '/api/' + model.label + '/{id}/{property}.json',
			handler: putProp
		})
	]
}