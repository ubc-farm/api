import {Model} from 'objection';
import Task from './';

import {Crop} from '../field.js';

/**
 * Shared properties for scouting tasks, mainly used for historical data
 * @extends Task
 * @property {string} cropId
 */
export default class Scouting extends Task {
	static get tableName() {return 'Scouting'}

	static get relationMappings() {
		return Object.assign({
			/** The crop that the scouting is related to */
			crop: {
				relation: Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'Scouting.cropId',
					to: 'Crop.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Data for scouting a harvest
 * @extends Scouting
 * @property {Date} [newExpectedHarvest]
 * @property {number} [newPredictedYield]
 */
export class ScoutHarvest extends Scouting {
	static get tableName() {return 'ScoutHarvest'}
}

/**
 * Data for scouting pests in the crop
 * @extends Scouting
 * @property {string} [pestType]
 * @property {string} [affectedSpot]
 * @property {string} [pestName]
 * @property {string} [pestNameLatin]
 * @property {number} [percentAreaAffected]
 * @property {number} [percentPlantsAffected]
 * @property {number} [economicThreshold]
 */
export class ScoutPest extends Scouting {
	static get tableName() {return 'ScoutPest'}
}