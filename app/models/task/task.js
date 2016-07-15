import {Model} from 'objection';
import {Location, Program, Employee, Equipment} from '../index.js';
import {Assignment, EquipmentUsage, ProgramUsage} from '../joins';

/**
 * Common attributes for tasks that other tables inherit.
 * @alias module:app/models.Task
 * @property {number[]} [time] - tsrange representing the task time
 * @property {Object} [hoursTaken] - interval showing how long the 
 * task actually took.
 * @property {string} [locationId]
 */
export default class Task extends Model {
	static get tableName() {return 'Task'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			time: {
				type: 'array',
				items: [
					{type: 'integer'},
					{type: 'integer'}
				],
				minItems: 1, maxItems: 2
			},
			locationId: {type: 'integer'}
		}
	}}

	/** @type {Date} */
	get start() {return new Date(this.time[0]);}
	set start(date) {this.time[0] = date.getTime();}
	/** @type {Date} */
	get end() {return new Date(this.time[1]);}
	set end(date) {this.time[1] = date.getTime();}

	/** @type {integer} different between start and end in milliseconds */
	get hoursTaken() {
		const [start, end] = this.time;
		return end - start;
	}

	static get relationMappings() {
		return {
			/** 
			 * Location for this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Location} 
			 */
			location: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			/** 
			 * Programs that this task is linked to 
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Program[]}
			 */
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
			/** 
			 * Employees assigned to this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Employee[]} 
			 */
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
			/** 
			 * Equipment used by this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Equipment[]} 
			 */
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