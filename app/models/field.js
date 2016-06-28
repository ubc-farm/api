import {Model} from 'objection';

import Plant from './ref/plant.js';
import {Scouting} from './task/scouting.js';

/**
 * Represents a field or sub-field in the farm with crops. If parentField is 
 * specified, the field is a sub-field. 
 * @module backend/database/models/field
 * @property {float[][]} path - [x,y] coordinates of the field's path
 * @property {float[]} [gridWidths]
 * @property {float[]} [gridHeights]
 * @property {string} [parent] field id
 */
export class Field extends Model {
	static get tableName() {return 'Field'}
	static get label() {return 'fields'}

	get grid() {
		const [baseWidth, ...specificWidths] = this.gridWidths;
		const [baseHeight, ...specificHeights] = this.gridHeights;
		return {
			baseWidth, baseHeight,
			specificWidths, specificHeights
		};
	}

	static get relationMappings() {
		return {
			/** Crops growing in this field */
			crops: {
				relation: Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Field.id',
					to: 'Crop.fieldId'
				}
			},
			/** The containing field, if applicable */
			parentField: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Field.parent',
					to: 'Field.id'
				}
			},
			/** Fields within this one, if applicable */
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

/**
 * Data for a crop growing in a field, including the type of plant it it and
 * historical data like scouting.
 * @property {string} type of plant growing in this field.
 * @property {string} fieldId of the field this crop grows in
 * @property {number} quantity of this crop growing in the field
 * @property {string} predictedNutrientReq - predicted nutrient requirements
 * @proeprty {Date} [expectedHarvest]
 */
export class Crop extends Model {
	static get tableName() {return 'Crop'}

	static get relationMappings() {
		return {
			/** The type of plant */
			variety: {
				relation: Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Crop.type',
					to: 'Plant.id'
				}
			},
			/** The field this crop grows in */
			field: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Crop.fieldId',
					to: 'Field.id'
				}
			},
			/** Scouting logs */
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