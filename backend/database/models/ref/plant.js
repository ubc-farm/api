import {Model} from 'objection';
import Item from './item.js';

import {Crop} from '../field.js';

/**
 * Extends Item with Plant specific information for crops
 * @extends Item
 * @property {string} [latin] name of the plant
 */
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