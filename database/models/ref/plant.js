import { Model } from 'objection';
import { Item } from './index.js';
import { Crop } from '../index.js';

/**
 * Extends Item with Plant specific information for crops
 * @extends Item
 * @property {string} [latin] name of the plant
 */
export default class Plant extends Item {
	static get tableName() { return 'Plant'; }
	static get label() { return 'plants'; }

	static get relationMappings() {
		return {
			crops: {
				relation: Model.HasManyRelation,
				modelClass: Crop,
				join: {
					from: 'Plant.id',
					to: 'Crop.type',
				},
			},
			mixedPlants: {
				relation: Model.ManyToManyRelation,
				modelClass: Plant,
				join: {
					from: 'Plant.id',
					through: {
						modelClass: Mix,
						from: 'Mix.forId',
						to: 'Mix.subId',
					},
					to: 'Plant.id',
				},
			},
		};
	}
}

/**
 * Helper table for mix of seeds
 * @extends Model
 */
export class Mix extends Model {
	static get tableName() { return 'Mix'; }

	static get relationMappings() {
		return {
			subPlants: {
				relation: Model.HasManyRelation,
				modelClass: Plant,
				join: {
					from: 'Mix.subId',
					to: 'Plant.id',
				},
			},
			forPlant: {
				relation: Model.BelongsToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Mix.forId',
					to: 'Plant.id',
				},
			},
		};
	}
}
