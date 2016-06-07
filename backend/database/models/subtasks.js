import {Model} from 'objection';
import Task from './task.js';

import {Person as Company} from './person.js';
import {Crop} from './field.js';
import {Plant, Item, Chemical} from './reference.js';

export class Seeding extends Task {
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

export class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
}

export class PestControl extends Task {
	static get tableName() {return 'PestControl'}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Chemical,
				join: {
					from: 'PestControl.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

export class ScoutHarvest extends Task {
	static get tableName() {return 'ScoutHarvest'}

	static get relationMappings() {
		return Object.assign({
			crop: {
				relation: Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'ScoutHarvest.cropId',
					to: 'Crop.id'
				}
			}
		}, super.relationMappings);
	}
}

export class ScoutPest extends Task {
	static get tableName() {return 'ScoutPest'}

	static get relationMappings() {
		return Object.assign({
			crop: {
				relation: Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'ScoutPest.cropId',
					to: 'Crop.id'
				}
			}
		}, super.relationMappings);
	}
}

export class SoilSampling extends Task {
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