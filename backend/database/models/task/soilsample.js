import {Model} from 'objection';
import Task from './';

import {Person as Company} from '../person';

/**
 * A soil sampling task
 * @module backend/database/models/soilsample
 * @extends Task
 * @property {number} [depth]
 * @property {string} [methodUsed]
 * @property {string} [variable]
 * @property {string} [result]
 * @property {string} [company]
 */
export default class SoilSampling extends Task {
	static get tableName() {return 'SoilSampling'}

	static get relationMappings() {
		return Object.assign({
			samplingCompany: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'SoilSampling.company',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}