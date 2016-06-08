import {Model} from 'objection';
import Person from './';

import Task from '../task';

/**
 * Extends Person with timetable information. Task assignments are also
 * joined to employees
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