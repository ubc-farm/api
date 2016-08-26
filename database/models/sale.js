import { Model } from 'objection';
import Money from 'ubc-farm-money';
import { Person, Location } from './index.js';

/**
 * A common format for sale information. This can be used for tickets,
 * things we sell, or logs of things we purchased.
 * @extends Model
 * @property {number} [order_date]
 * @property {number} [delivery_date] - when the product was delivered/arrived
 * @property {string} [customerId] - the buyer (can be ourselves)
 * @property {string} [deliveryLocation] - reference to the delivery location
 * @property {number} [quantity=1]
 * @property {number} [price]
 * @property {number} [discount], as set value (not a percentage)
 * @property {number} [tax], as set value (not a percentage)
 * @property {string} [notes]
 * @property {number} [budgetLineNumber]
 */
export default class Sale extends Model {
	static get tableName() { return 'Sale'; }
	static get label() { return 'sales'; }

	/** @type {Money} */
	get cost() { return new Money(this.price); }
	set cost(money) { this.price = money.toJSON(); }

	/** @type {Date} */
	get orderDate() { return new Date(this.order_date); }
	set orderDate(date) { this.order_date = date.getTime(); }
	/** @type {Date} */
	get deliveryDate() { return new Date(this.delivery_date); }
	set deliveryDate(date) { this.delivery_date = date.getTime(); }

	static get relationMappings() {
		return {
			/**
			 * Refers to the customer who purchased an item in this sale.
			 * A possible buyer is ourself, in which case this sale is a purchase
			 * rather than a sale to someone else.
			 * @memberof! Sale#
			 * @type {Person}
			 */
			customer: {
				relation: Model.BelongsToOneRelation,
				modelClass: Person,
				join: {
					from: 'Sale.customerId',
					to: 'Person.id',
				},
			},
			/**
			 * Represents the location this item was delivered to.
			 * @todo find a way to allow for custom locations
			 * @memberof! Sale#
			 * @type {Location}
			 */
			deliveryLoc: {
				relation: Model.BelongsToOneRelation,
				modelClass: Location,
				join: {
					from: 'Sale.deliveryLocation',
					to: 'Location.id',
				},
			},
		};
	}
}

/**
 * A Grant uses sale data to represent the monentary values.
 * @extends Sale
 * @property {string} grantName
 */
export class Grant extends Sale {
	static get tableName() { return 'Grant'; }
	static get label() { return 'grants'; }
}
