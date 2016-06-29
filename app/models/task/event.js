import {Model} from 'objection';
import {Task, Sale, Person} from '../';

/**
 * Represents an event held at the farm
 * @module backend/database/models/task/event
 * @extends Task
 * @property {string} [type]
 * @property {string} name of the event
 * @property {number} [estimatedAttendeeAmount]
 * @property {number[]} [targetAgeGroup] - int4range
 * @property {string} [ticketId] - id for sale data for tickets to this event
 * @property {string} [contactId] - id for the person to contact for this event
 */
export default class Event extends Task {
	static get tableName() {return 'Event'}
	static get label() {return 'events'}

	static get relationMappings() {
		return Object.assign({
			/** Contains ticket sale data for this event */
			ticket: {
				relation: Model.OneToOneRelation,
				modelClass: Sale,
				join: {
					from: 'Event.ticketId',
					to: 'Sale.id'
				}
			},
			/** Represents a person to contact about this event */
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