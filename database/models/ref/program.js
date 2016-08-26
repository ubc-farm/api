import { Model } from 'objection';
import { Task } from '../index.js';

/**
 * Represents a program at the farm
 * @property {string} name
 * @property {Object} [color] used to represent this program in the interface
 * @property {boolean} [text_color] - text color to use. Should be calculated
 * based on the color, see WebAIM Color Contrast Checker.
 * @property {string} [linkedAccount]
 */
export default class Program extends Model {
	static get tableName() { return 'Program'; }
	static get label() { return 'program'; }

	static get relationMappings() {
		return {
			/**
			 * An Account linked to this program
			 * @memberof! Program#
			 */
			link: {
				relation: Model.BelongsToOneRelation,
				modelClass: Account,
				join: {
					from: 'Program.linkedAccount',
					to: 'Account.id',
				},
			},
			/**
			 * Tasks and events classified under this program
			 * @memberof! Program#
			 * @type {Task[]}
			 */
			tasks: {
				relation: Model.ManyToManyRelation,
				modelClass: Task,
				join: {
					from: 'Program.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.programId',
						to: 'ProgramUsage.taskId',
					},
					to: 'Task.id',
				},
			},
		};
	}
}

export class Account extends Model {
	static get tableName() { return 'Account'; }

	static get relationMappings() {
		return {
			programs: {
				relation: Model.HasManyRelation,
				modelClass: Program,
				join: {
					from: 'Account.id',
					to: 'Program.linkedAccount',
				},
			},
		};
	}
}

/**
 * Helper table to join Programs with Tasks
 * @extends Model
 */
export class ProgramUsage extends Model {
	static get tableName() { return 'ProgramUsage'; }

	static get relationMappings() {
		return {
			program: {
				relation: Model.HasManyRelation,
				modelClass: Program,
				join: {
					from: 'ProgramUsage.programId',
					to: 'Program.id',
				},
			},
			task: {
				relation: Model.HasManyRelation,
				modelClass: Task,
				join: {
					from: 'ProgramUsage.taskId',
					to: 'Task.id',
				},
			},
		};
	}
}
