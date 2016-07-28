import {Person, Employee, Researcher} from '../../ubc-farm-database/index.js';
import {
	transformReply,
	arrayToObjectMap,
	removeNullandUndef
} from './transformer.js';

/**
 * Retrieve all people from the database and reply with them
 */
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

/**
 * Retrieves a specific subset of the directory specified by the role provided
 */
export function roleDirectory(request, reply) {
	const {role} = request.params;

	let query;
	if (role === 'Employee') query = Employee.query();
	else if (role === 'Researcher') query = Researcher.query();
	else query = Person.query().where('role', '=', role);

	return transformReply(
		query
			.then(list => arrayToObjectMap(list))
			.then(json => removeNullandUndef(json)), 
		request, 
		reply
	);
}

export default [
	{
		method: 'GET',
		path: '/api/directory',
		handler: directory,
		config: {cors: true}
	},
	{
		method: 'GET',
		path: '/api/directory/{role}',
		handler: roleDirectory,
		config: {cors: true}
	}
];