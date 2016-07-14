import {Model} from 'objection';
import Task from './task.js';
import {Chemical} from '../index.js';

/**
 * Shared properties for chemical tasks
 * @alias module:app/models.ChemicalTask
 * @extends module:app/models.Task
 * @property {string} [product] used for this task
 * @property {number} [applicationRate] of the product
 */
export default class ChemicalTask extends Task {
	static get tableName() {return 'ChemicalTask'}
	static get label() {return 'chemical-tasks'}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Chemical,
				join: {
					from: 'ChemicalTask.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Task for fertilizing a field
 * @alias module:app/models.Fertilizing
 * @extends module:app/models.ChemicalTask
 * @property {string} [plantLocation] - i.e.: spot, broadcast
 */
export class Fertilizing extends ChemicalTask {
	static get tableName() {return 'Fertilizing'}
	static get label() {return 'fertilizing'}
}

/**
 * Task for pest control for a field
 * @alias module:app/models.PestControl
 * @extends module:app/models.ChemicalTask
 * @property {float[]} [waterToMixRatio] - where water:mix maps to [water, mix]
 * @property {string} [plantLocation] - i.e.: foliar, root
 * @property {Object} [entryInterval]
 * @property {Object} [harvestInterval]
 */
export class PestControl extends ChemicalTask {
	static get tableName() {return 'PestControl'}
	static get label() {return 'pest-control'}
}