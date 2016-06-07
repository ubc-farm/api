import {Model} from 'objection';
import Task from './';

export default class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
}