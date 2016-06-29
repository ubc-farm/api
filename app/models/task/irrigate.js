import {Model} from 'objection';
import {Task} from '../';

/**
 * An irrigation task
 * @module backend/database/models/task/irrigate
 * @extends Task
 * @property {number} [flowRate]
 * @property {string} [type]
 */
export default class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
	static get label() {return 'irrigation'}
}