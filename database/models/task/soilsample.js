import { Model } from 'objection';
import Task from './task.js';
import { Person as Company } from '../index.js';

/**
 * A soil sampling task
 * @extends Task
 * @property {number} [depth]
 * @property {string} [methodUsed]
 * @property {string} [variable]
 * @property {string} [result]
 * @property {string} [company]
 */
export default class SoilSampling extends Task {
	static get tableName() { return 'SoilSampling'; }
	static get label() { return 'soil-samples'; }

	static get relationMappings() {
		return Object.assign({
			samplingCompany: {
				relation: Model.BelongsToOneRelation,
				modelClass: Company,
				join: {
					from: 'SoilSampling.company',
					to: 'Person.id',
				},
			},
		}, super.relationMappings);
	}
}
