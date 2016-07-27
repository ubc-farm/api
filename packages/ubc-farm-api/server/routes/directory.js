import {Person, Employee, Researcher} from '../../../app/models/index.js';
import {
	transformReply,
	arrayToObjectMap,
	removeNullandUndef
} from '../../../lib/api-handler/utils.js';

export function directory(request, reply) {
	const query = Promise.all([
		Person.query(), Employee.query(), Researcher.query()
	]).then(([people, employees, researchers]) => {
		employees = employees.map(val => {val.role = 'Employee'; return val})
		researchers = researchers.map(val => {val.role = 'Researcher'; return val})

		return people.concat(employees, researchers);
	})
	.then(list => arrayToObjectMap(list))
	.then(json => removeNullandUndef(json));

	return transformReply(query, request, reply);
}

export default {
	method: 'GET',
	path: '/api/directory',
	handler: directory,
	config: {
		cors: true
	}
};