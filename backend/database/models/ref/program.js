import {Model} from 'objection';

import Task from '../task';

/**
 * Represents a program at the farm
 * @property {string} name
 * @property {Object} [color] used to represent this program in the interface
 * @property {boolean} [darkText] - true if black text should be used instead 
 * of white text. Should be auto-calculated based on the color.
 * @property {string} [linkedAccount]
 */
export default class Program extends Model {
	static get tableName() {return 'Program'}

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
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'Program.id',
					to: 'Task.programId'
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