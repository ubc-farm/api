import {Model} from 'objection';
import Task from './task.js';

/**
 * An irrigation task
 * @alias module:app/models.Irrigate
 * @extends Task
 * @property {number} [flowRate]
 * @property {string} [type]
 */
export default class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
	static get label() {return 'irrigation'}
}