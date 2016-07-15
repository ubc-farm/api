/*{
	method: 'GET',
	path: '/api/items/{id?}/{property?}',
	handler: {api: {table: 'Item'}}
}*/
//Quick and dirty route generators for the API

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const tables = ['Person', 'Employee', 'Researcher', 'Assignment', 'Equipment', 
	'EquipmentUsage', 'Event', 'Task', 'Field', 'Crop', 'Item', 'Plant', 
	'Location', 'Program', 'ProgramUsage', 'Account', 'Chemical', 'Sale', 'Grant',
	'ResearchProject', 'ResearchPartner', 'Mix'];
const labels = ['people', 'employees', 'researchers', 'assignments', 
	'equipment', 'equipmentusage', 'events', 'tasks', 'fields', 'crops', 'items', 
	'plants', 'location', 'program', 'programusage', 'account', 'chemicals', 
	'sales', 'grants', 'researchprojects', 'researchpartners', 'mixes']
import * as models from 'app/models';

function* methodRoutes(table, alias) {
	for (let method of methods) {
		const handler = {api: {model: table}};
		if (method == 'POST') {
			yield {
				method, handler,
				path: `/api/${alias}`
			}
		} else {
			yield {
				method, handler,
				path: `/api/${alias}/{id?}`
			};
			yield {
				method, handler,
				path: `/api/${alias}/{id}/{property}`
			};
		}
	}
}

function* modelRoutes() {
	let completed = [];
	for (let modelName in models) {
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

const routes = [...modelRoutes()];
export default routes;