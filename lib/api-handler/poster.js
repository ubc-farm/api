import {silentTransform, prettyPrint} from './utils.js';

export default function poster(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {payload, query: {print}} = request;
		const silentPrintFlag = print === 'silent', 
			prettyPrintFlag = print === 'pretty';

		const query = Model.query().insert(payload)
		.then(inserted => ({ id: inserted[Model.idColumn] }))
		.then(data => silentTransform(request, data, silentPrintFlag))

		return prettyPrint( reply(query), prettyPrintFlag );
	};
}