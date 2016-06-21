import {Model} from 'objection';

import ChemicalTask from '../task/chem.js';

/**
 * A chemical product, such as fertilizer or herbicide.
 * @module backend/database/models/ref/chemical
 * @property {string} [type]
 * @property {string} [productName]
 * @property {Object} [composition]
 */
export class Chemical extends Model {
	static get tableName() {return 'Chemical'}

	static get relationMappings() {
		return {
			/** Tasks where the chemical is used */
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