import {Model} from 'objection';
import Person from './';

import Task from '../task';

export default class Employee extends Person {
	static get tableName() {return 'Employee'}

	static get relationMappings() {
		return Object.assign({
			assignments: {
				relation: Model.ManyToManyRelation,
				modelClass: Task,
				join: {
					from: 'Employee.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_employee',
						to: 'Assignment.assigned_task'
					},
					to: 'Task.id'
				}
			}
		}, super.relationMappings);
	}
}

export class Assignment extends Model {
	static get tableName() {return 'Assignment'}

	static get relationMappings() {
		return {
			assignedEmployee: {
				relation: Model.OneToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Assignment.assigned_employee',
					to: 'Employee.id'
				}
			},
			assignedTask: {
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'Assignment.assigned_task',
					to: 'Task.id'
				}
			}
		}
	}
}