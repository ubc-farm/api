import modify from './modify.js'

function getAll(request, reply) {
	const data = this.query()
		.then(rows => {
			let json = { [this.label]: {} };
			for (let row of rows) json[this.label][row.$id] = row;
			return json;
		});
	return modify(data, request, reply);
}

function get(request, reply) {
	const {id, property} = request.params;
	const query = this.query().findById(id)
	if (property) query.column(property);
	return modify(query.execute(), request, reply);
}

export default function get(model) {
	if (!model.label) model.label = model.tableName.toLowerCase() + 's';
	const route = {
		method: 'GET',
		config: {
			bind: Model
		}
	}

	return [
		Object.assign(route, {
			path: '/api/' + model.label + '.json',
			handler: getAll
		}),
		Object.assign(route, {
			path: '/api/' + model.label + '/{id}/{property?}.json',
			handler: get
		})
	]
}