import modify from './modify.js'

/**
 * Query all rows in the given model, then return an object where the
 * array objects have been mapped to properties named with their id
 * @param {Request} request
 * @param {Reply} reply
 * @this {Model} model from objection.js, with a label property
 * @returns {Reply<Object>} JSON
 */
function getAll(request, reply) {
	const data = this.query()
		.then(rows => {
			let json = { [this.label]: {} };
			for (let row of rows) json[this.label][row.$id] = row;
			return json;
		});
	return modify(data, request, reply);
}

/**
 * Query a single row then return that row, or a property of that row.
 * @param {Request} request
 * @param {string} request.params.id
 * @param {string} [request.params.property]
 * @param {Reply} reply
 * @this {Model} model from objection.js
 * @returns {Reply<Object|*>} either the row as JSON, 
 * or the specific property value.
 */
function get(request, reply) {
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
export default function getRoute(model) {
	if (!model.label) model.label = model.tableName.toLowerCase() + 's';
	const route = {
		method: 'GET',
		config: {
			bind: Model
		}
	}

	return [
		Object.assign({}, route, {
			path: '/api/' + model.label + '.json',
			handler: getAll
		}),
		Object.assign({}, route, {
			path: '/api/' + model.label + '/{id}/{property?}.json',
			handler: get
		})
	]
}