import { Model } from 'objection';
import { Polygon } from '../../utils/geojson.js';
import { Plant, Scouting } from './index.js';

/**
 * Represents a field or sub-field in the farm with crops. If parentField is
 * specified, the field is a sub-field.
 * @extends Model
 * @property {float[][]} path - [x,y] coordinates of the field's path
 * @property {float[]} [gridWidths]
 * @property {float[]} [gridHeights]
 * @property {string} [parent] field id
 */
export default class Field extends Model {
	static get tableName() { return 'Field'; }
	static get label() { return 'fields'; }

	/** @type {GeoJSON.Polygon} */
	get polygon() { return new Polygon(...(this.path || [])); }
	set polygon(value) { this.path = value.toJSON().coordinates; }

	get grid() {
		if (!this.gridWidths && !this.gridHeights) return undefined;

		const [baseWidth, ...specificWidths] = this.gridWidths || [];
		const [baseHeight, ...specificHeights] = this.gridHeights || [];
		return {
			baseWidth,
			baseHeight,
			specificWidths,
			specificHeights,
		};
	}

	$formatDatabaseJson(json) {
		const forDatabase = Object.assign({}, json);
		if (forDatabase.path != null) {
			forDatabase.path = JSON.stringify(forDatabase.path);
		}
		return super.$formatDatabaseJson(forDatabase);
	}

	$parseDatabaseJson(json) {
		if (json.path != null && typeof json.path === 'string') {
			const path = JSON.parse(json.path);
			const result = Object.assign({}, json, { path });
			return super.$parseDatabaseJson(result);
		}

		return super.$parseDatabaseJson(json);
	}

	static get relationMappings() {
		return {
			/**
			 * Crops growing in this field
			 * @memberof! Field#
			 * @type {Crop}
			 */
			crops: {
				relation: Model.HasManyRelation,
				modelClass: Crop,
				join: {
					from: 'Field.id',
					to: 'Crop.fieldId',
				},
			},
			/**
			 * The containing field, if applicable
			 * @memberof! Field#
			 * @type {Field}
			 */
			parentField: {
				relation: Model.BelongsToOneRelation,
				modelClass: Field,
				join: {
					from: 'Field.parent',
					to: 'Field.id',
				},
			},
			/**
			 * Fields within this one, if applicable
			 * @memberof! Field#
			 * @type {Field[]}
			 */
			childFields: {
				relation: Model.HasManyRelation,
				modelClass: Field,
				join: {
					from: 'Field.id',
					to: 'Field.parent',
				},
			},
		};
	}
}

/**
 * Data for a crop growing in a field, including the type of plant it it and
 * historical data like scouting.
 * @extends Model
 * @property {string} type of plant growing in this field.
 * @property {string} fieldId of the field this crop grows in
 * @property {string} predictedNutrientReq - predicted nutrient requirements
 * @proeprty {Date} [expectedHarvest]
 */
export class Crop extends Model {
	static get tableName() { return 'Crop'; }

	static get jsonSchema() {
		return {
			type: 'object',
			properties: {
				type: { type: 'string' },
				fieldId: { type: 'integer' },
				quantity: { type: 'integer' },
			},
		};
	}

	static get relationMappings() {
		return {
			/**
			 * The type of plant
			 * @memberof! Crop#
			 * @type {Plant}
			 */
			variety: {
				relation: Model.BelongsToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Crop.type',
					to: 'Plant.id',
				},
			},
			/**
			 * The field this crop grows in
			 * @memberof! Crop#
			 */
			field: {
				relation: Model.BelongsToOneRelation,
				modelClass: Field,
				join: {
					from: 'Crop.fieldId',
					to: 'Field.id',
				},
			},
			/**
			 * Scouting logs
			 * @memberof! Crop#
			 */
			scouting: {
				relation: Model.HasManyRelation,
				modelClass: Scouting,
				join: {
					from: 'Crop.id',
					to: 'Scouting.crop',
				},
			},
		};
	}
}
