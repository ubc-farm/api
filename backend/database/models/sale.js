import {Model} from 'objection';

import Person from './person';
import Location from './ref/location.js';

export default class Sale extends Model {
	static get tableName() {return 'Sale'}

	static get relationMappings() {
		return {
			customer: {
				relation: Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Sale.customerId',
					to: 'Person.id'
				}
			},
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