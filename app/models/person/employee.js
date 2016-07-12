import {Model} from 'objection';
import Person from './person.js';
import {Task} from '../';

/**
 * Extends Person with timetable information. Task assignments are also
 * joined to employees
 * @module backend/database/models/person/employee
 * @extends Person
 * @property {boolean[]} [workingDays], where the index corresponds to a day
 * @property {number} [hourlyPay]
 * @property {boolean} [fullOrPartTime] true if full time, false if part time
 * @property {Date[]} [holidayDays=[]]
 * @property {Date[]} [sickDays=[]]
 * @property {Date[]} [paidLeaveDays=[]]
 * @property {Object} [inLieuHours] - an interval object
 * @property {Date[][]} [medicalLeaveTime] - an array of tsrange values
 * @property {string} [emergencyContactName]
 * @property {string} [emergencyContactNumber]
 */
export default class Employee extends Person {
	static get tableName() {return 'Employee'}
	static get label() {return 'employees'}

	static get jsonSchema() {
		return Object.assign({
			workingDays: {
				type: 'array',
				items: [
					{type: 'boolean', default: false},
					...Array(5).fill({type: 'boolean', default: true}),
					{type: 'boolean', default: false}
				],
				minItems: 7, maxItems: 7
			},
			hourlyPay: {
				type: 'integer'
			}
		})
	}

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

/**
 * Helper table to join Employees with their assigned Tasks
 */
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