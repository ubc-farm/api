{
	method: 'GET',
	path: '/api/items/{id?}/{property?}',
	handler: {api: {table: 'Item'}}
}
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

function* methodRoutes(table, alias) {
	for (let method in methods) {
		let path = `/api/${alias}/{id?}/{property?}`;
		if (method == 'POST') path = `/api/${alias}`;

		yield {
			method, path,
			handler: {
				api: {table}
			}
		}
	}
}

function* tableRoutes() {
	for (let i = 0; i < tables.length; i++) {
		yield methodRoutes(tables[i], labels[i]);
	}
}

const routes = [...tableRoutes()];
export default routes;