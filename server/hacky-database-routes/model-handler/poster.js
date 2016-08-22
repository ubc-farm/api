import { ValidationError } from 'objection';
import { wrap as boomWrap } from 'boom';

export default function poster(route, options) {
	const Model = options.model;
	return function postHandler(request, reply) {
		const { payload, params: { print } } = request;

		const query = Model.query()
			.insert(payload)
			.then(inserted => ({ id: inserted[Model.idColumn] }))
			.catch(err => {
				if (err instanceof ValidationError) {
					console.log(err, payload);
					throw boomWrap(err, err.statusCode);
				}

				throw err;
			});

		const response = reply(query);
		if (print === 'pretty') response.spaces(2);

		if (print === 'silent') response.code(204);
		else response.code(201);

		return response;
	};
}
