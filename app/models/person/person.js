import {Model} from 'objection';
import {Sale, Item} from '../';

/**
 * Used to represent a person or company, such as employees and customers. Can
 * be linked to a user account.
 * @module backend/database/models/person
 * @property {string} name
 * @property {string} [role] of the person
 * @property {string} [email] - email address
 * @property {string} [phoneNumber]
 * @property {Object} [addressMailing], following addressSchema
 * @property {Object} [addressPhysical], following addressSchema
 */
export default class Person extends Model {
	static get tableName() {return 'Person'}
	static get label() {return 'people'}

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

/**
 * Schema for objects used to represent an address.
 */
const addressSchema = {
	type: 'object',
	properties: {
		street: {type: 'string'},
		city: {type: 'string'},
		province: {type: 'string'},
		postalCode: {type: 'string', maxLength: 6}
	}
}