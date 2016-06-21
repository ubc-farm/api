const route = {
	method: 'GET',
	path: `/api/${Model.tableName}/{id}/{path*}`,
	handler: function(request, reply) {
		const {print, shallow, orderBy} = request.query;
		const path = request.params.path.split('/');
		if (print === 'pretty') reply.spaces('/t');

		
	}, 
	config: {
		bind: Model
	}
}