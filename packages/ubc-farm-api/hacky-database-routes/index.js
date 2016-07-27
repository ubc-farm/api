//Quick and dirty route generators for the API

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
import * as models from '../../ubc-farm-database/index.js';
import modelHandler from './model-handler/index.js';

function* methodRoutes(model) {
	for (let method of methods) {
		const handler = modelHandler({method}, {model});
		if (method == 'POST') {
			yield {
				method, handler,
				path: `/api/${model.label}`
			}
		} else {
			yield {
				method, handler,
				path: `/api/${model.label}/{id?}`
			};
			yield {
				method, handler,
				path: `/api/${model.label}/{id}/{property}`
			};
		}
	}
}

function* modelRoutes() {
	let completed = [];
	for (let modelName in models) {
		if (modelName === 'joins') continue;
		const model = models[modelName];
		if (!model.label) model.label = model.tableName.toLowerCase() + 's';
		if (completed.indexOf(model.label) > -1) {
			console.warn(model.label, 'from', modelName, 'already processed');
			continue;
		}
		yield* methodRoutes(model, model.label);
		completed.push(model.label);
	}
}

export default [...modelRoutes()];