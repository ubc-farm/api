import {Model} from 'objection';
import Task from './';

import {Crop} from '../field.js';
import Plant from '../ref/plant.js';
import Item from '../ref/item.js';

/**
 * Task for seeding and transplating
 * @extends Task
 * @property {string} crop affected/created by this task
 * @property {string} [variety] of plant
 * @property {string} [product]
 * @property {string} [methodUsed]
 * @property {float[]} [spacingBetweenHoles] - expressed as [width, height]
 * @property {float} [depthOfHoles]
 * @property {float} [seedsPerHole]
 * @property {float} [seedsPerGram]
 * @property {float} [predictedYield]
 * @property {Object} [daysToMaturity] - an interval
 * @property {Object} [npkReq] - Required N, P, and K amounts
 */
export default class Seeding extends Task {
	static get tableName() {return 'Seeding'}

	static get relationMappings() {
		return Object.assign({
			seeded: {
				relation: Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'Seeding.crop',
					to: 'Crop.id'
				}
			},
			seedVariety: {
				relation: Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Seeding.variety',
					to: 'Plant.id'
				}
			},
			seedProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Item,
				join: {
					from: 'Seeding.product',
					to: 'Item.id'
				}
			}
		}, super.relationMappings);
	}
}