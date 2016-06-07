import {Model} from 'objection';
import Task from './';

import {Crop} from '../field.js';

export default class Scouting extends Task {
	static get tableName() {return 'Scouting'}

	static get relationMappings() {
		return Object.assign({
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

export class ScoutHarvest extends Task {
	static get tableName() {return 'ScoutHarvest'}
}

export class ScoutPest extends Task {
	static get tableName() {return 'ScoutPest'}
}