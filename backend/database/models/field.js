import {Model} from 'objection';

import {Plant} from './reference.js';
import {Scouting} from './task/scouting.js';

export class Field extends Model {
	static get tableName() {return 'Field'}

	static get relationMappings() {
		return {
			crops: {
				relation: Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Field.id',
					to: 'Crop.fieldId'
				}
			},
			parentField: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Field.parent',
					to: 'Field.id'
				}
			},
			childFields: {
				relation: Model.OneToManyRelation,
				modelClass: Field,
				join: {
					from: 'Field.id',
					to: 'Field.parent'
				}
			}
		}
	}
}

export class Crop extends Model {
	static get tableName() {return 'Crop'}

	static get relationMappings() {
		return {
			variety: {
				relation: Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Crop.type',
					to: 'Plant.id'
				}
			},
			field: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Crop.fieldId',
					to: 'Field.id'
				}
			},
			scouting: {
				relation: Model.OneToManyRelation,
				modelClass: Scouting,
				join: {
					from: 'Crop.id',
					to: 'Scouting.crop'
				}
			}
		}
	}
}

export class Location extends Model {
	static get tableName() {return 'Location'}

	static get relationMappings() {
		return {
			field: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Location.fieldId',
					to: 'Field.id'
				}
			}
		}
	}
}