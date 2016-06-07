import {Model} from 'objection';

import Sale from './sale.js';
import {Item} from './reference.js';

export default class Person extends Model {
	static get tableName() {return 'Person'}

	static get relationMappings() {
		return {
			purchases: {
				relation: Model.OneToManyRelation,
				modelClass: Sale,
				join: {
					from: 'Person.id',
					to: 'Sale.customer'
				}
			},
			products: {
				relation: Model.OneToManyRelation,
				modelClass: Item,
				join: {
					from: 'Person.id',
					to: 'Item.supplier'
				}
			}
		}
	}
}

const addressSchema = {
	type: 'object',
	properties: {
		street: {type: 'string'},
		city: {type: 'string'},
		province: {type: 'string'},
		postalCode: {type: 'string', maxLength: 6}
	}
}