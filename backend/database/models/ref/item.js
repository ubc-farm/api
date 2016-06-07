import {Model} from 'objection';

import {Person as Company} from '../person';
import Equipment from '../equipment.js';

export default class Item extends Model {
	static get tableName() {return 'Item'}

	static get relationMappings() {
		return {
			supplier: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'Item.supplierId',
					to: 'Person.id'
				}
			},
			equipment: {
				relation: Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Item.id',
					to: 'Equipment.product'
				}
			}
		}
	}
}
