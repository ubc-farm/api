import {Model} from 'objection';

import Person from './person';
import Location from './ref/location.js';

/**
 * A common format for sale information. This can be used for tickets,
 * things we sell, or logs of things we purchased.
 * @property {Date} [orderDate]
 * @property {Date} [deliveryDate] - when the product was delivered/arrived
 * @property {string} [customerId] - the buyer (can be ourselves)
 * @property {string} [deliveryLocation] - reference to the delivery location
 * @property {number} [quantity=1] 
 * @property {number} [price] 
 * @property {number} [discount], as set value (not a percentage)
 * @property {number} [tax], as set value (not a percentage)
 * @property {string} [notes]
 */
export default class Sale extends Model {
	static get tableName() {return 'Sale'}

	static get relationMappings() {
		return {
			/** 
			 * Refers to the customer who purchased an item in this sale. 
			 * A possible buyer is ourself, in which case this sale is a purchase
			 * rather than a sale to someone else. 
			 */
			customer: {
				relation: Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Sale.customerId',
					to: 'Person.id'
				}
			},
			/**
			 * Represents the location this item was delivered to. 
			 * @todo find a way to allow for custom locations
			 */
			deliveryLoc: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Sale.deliveryLocation',
					to: 'Location.id'
				}
			}
		}
	}
}

export class Grant extends Sale {
	static get tableName() {return 'Grant'}
}