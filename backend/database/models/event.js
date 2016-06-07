import {Model} from 'objection';
import {Task} from './task.js';

export class Event extends Task {
	static get tableName() {return 'Event'}
}