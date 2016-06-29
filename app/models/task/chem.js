import {Model} from 'objection';
import Task from './task.js';
import {Chemical} from '../';

/**
 * Shared properties for chemical tasks
 * @module backend/database/models/task/chem
 * @extends Task
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
 * @extends ChemicalTask
 * @property {string} [plantLocation] - i.e.: spot, broadcast
 */
export class Fertilizing extends ChemicalTask {
	static get tableName() {return 'Fertilizing'}
}

/**
 * Task for pest control for a field
 * @extends ChemicalTask
 * @property {float[]} [waterToMixRatio] - where water:mix maps to [water, mix]
 * @property {string} [plantLocation] - i.e.: foliar, root
 * @property {Object} [entryInterval]
 * @property {Object} [harvestInterval]
 */
export class PestControl extends ChemicalTask {
	static get tableName() {return 'PestControl'}
}