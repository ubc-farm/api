import {Model} from 'objection';
import {Location, Program, Employee, Equipment} from '../';
import {Assignment, EquipmentUsage} from '../joins';

/**
 * Common attributes for tasks that other tables inherit.
 * @module backend/database/models/task
 * @property {Date[]} [time] - tsrange representing the task time
 * @property {Object} [hoursTaken] - interval showing how long the 
 * task actually took.
 * @property {string} [locationId]
 */
export default class Task extends Model {
	static get tableName() {return 'Task'}

	static get relationMappings() {
		return {
			/** Location for this task */
			location: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			/** Programs that this task is linked to */
			program: {
				relation: Model.ManyToManyRelation,
				modelClass: Program,
				join: {
					from: 'Task.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.taskId',
						to: 'ProgramUsage.programId'
					},
					to: 'Program.id'
				}
			},
			/** Employees assigned to this task */
			labour: {
				relation: Model.ManyToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Task.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_task',
						to: 'Assignment.assigned_employee'
					},
					to: 'Employee.id'
				}
			},
			/** Equipment used by this task */
			equipment: {
				relation: Model.ManyToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Task.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.taskUsage',
						to: 'EquipmentUsage.equipment'
					},
					to: 'Equipment.id'
				}
			}
		}
	}
}