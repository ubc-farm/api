// Quick and dirty route generators for the API
import * as models from '../../database/index.js';
import { validate } from '../database-routes/transformer-validation.js';
import modelHandler from './model-handler/index.js';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

function* methodRoutes(model) {
	for (const method of methods) {
		const handler = modelHandler({ method }, { model });
		const config = { validate };
		if (method === 'POST') {
			yield {
				method,
				handler,
				path: `/api/${model.label}`,
				config: {
					validate,
					payload: {
						parse: true,
					},
				},
			};
		} else {
			yield {
				method,
				handler,
				config,
				path: `/api/${model.label}/{id?}`,
			};
			yield {
				method,
				handler,
				config,
				path: `/api/${model.label}/{id}/{property}`,
			};
		}
	}
}

function* modelRoutes() {
	const completed = [];
	for (const modelName in models) {
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
