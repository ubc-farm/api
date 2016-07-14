import {Model} from 'objection';
import {Task} from '../index.js';

/**
 * Represents a program at the farm
 * @alias module:app/models.Program
 * @property {string} name
 * @property {Object} [color] used to represent this program in the interface
 * @property {boolean} [darkText] - true if black text should be used instead 
 * of white text. Should be auto-calculated based on the color.
 * @property {string} [linkedAccount]
 */
export default class Program extends Model {
	static get tableName() {return 'Program'}
	static get label() {return 'program'}

	static get relationMappings() {
		return {
			/** An Account linked to this program */
			link: {
				relation: Model.OneToOneRelation,
				modelClass: Account,
				join: {
					from: 'Program.linkedAccount',
					to: 'Account.id'
				}
			},
			/** Tasks and events classified under this program */
			tasks: {
				relation: Model.ManyToManyRelation,
				modelClass: Task,
				join: {
					from: 'Program.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.programId',
						to: 'ProgramUsage.taskId'
					},
					to: 'Task.id'
				}
			}
		}
	}
}

export class Account extends Model {
	static get tableName() {return 'Account'}

	static get relationMappings() {
		return {
			programs: {
				relation: Model.OneToManyRelation,
				modelClass: Program,
				join: {
					from: 'Account.id',
					to: 'Program.linkedAccount'
				}
			}
		}
	}
}

/**
 * Helper table to join Programs with Tasks
 */
export class ProgramUsage extends Model {
	static get tableName() {return 'ProgramUsage'}

	static get relationMappings() {
		return {
			program: {
				relation: Model.OneToManyRelation,
				modelClass: Program,
				join: {
					from: 'ProgramUsage.programId',
					to: 'Program.id'
				}
			},
			task: {
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'ProgramUsage.taskId',
					to: 'Task.id'
				}
			}
		}
	}
}