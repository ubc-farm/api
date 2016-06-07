import {Model} from 'objection';

import ChemicalTask from './task/chem.js';

export class Chemical extends Model {
	static get tableName() {return 'Chemical'}

	static get relationMappings() {
		return {
			usage: {
				relation: Model.OneToManyRelation,
				modelClass: ChemicalTask,
				join: {
					from: 'Chemical.id',
					to: 'ChemicalTask.product'
				}
			}
		}
	}
}