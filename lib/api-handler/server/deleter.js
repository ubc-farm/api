export default function deleter(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {params: {id, property}} = request;
		const query = Model.query();

		if (property) 
			query.patchAndFetchById(id, { [property]: null })
		else 
			query.deleteById(id);
		
		return reply(query.then(() => null));
	};
}