import {Model} from 'objection';
import Task from './';

import {Crop} from '../field.js';
import Plant from '../ref/plant.js';
import Item from '../ref/item.js';

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