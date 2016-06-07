import {Model} from 'objection';

import {Crop} from '../field.js';

export default class Plant extends Item {
	static get tableName() {return 'Plant'}

	static get relationMappings() {
		return {
			crops: {
				relation: Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Plant.id',
					to: 'Crop.type'
				}
			}
		}
	}
}