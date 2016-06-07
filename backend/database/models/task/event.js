import {Model} from 'objection';
import Task from './';

import Sale from '../sale.js';
import Person from '../person';

export default class Event extends Task {
	static get tableName() {return 'Event'}

	static get relationMappings() {
		return Object.assign({
			ticket: {
				relation: Model.OneToOneRelation,
				modelClass: Sale,
				join: {
					from: 'Event.ticketId',
					to: 'Sale.id'
				}
			},
			contact: {
				relation: Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Event.contactId',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}