import {Model} from 'objection';
import Task from './';

export class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
}