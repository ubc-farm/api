import {Model} from 'objection';

import Task from './task';

export default class Program extends Model {
	static get tableName() {return 'Program'}

	static get relationMappings() {
		return {
			link: {
				relation: Model.OneToOneRelation,
				modelClass: Account,
				join: {
					from: 'Program.linkedAccount',
					to: 'Account.id'
				}
			},
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