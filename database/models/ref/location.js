import { Model } from 'objection';
import { Field } from '../index.js';
import { Position } from '../../../utils/geojson.js';

/**
 * Represents a location. If field is specified, this location represents that
 * field.
 * @extends Model
 * @property {string} [name]
 * @property {float[]} [position] - a coordinate expressed as [x, y]
 * @property {string} [fieldId]
 */
export default class Location extends Model {
	static get tableName() { return 'Location'; }
	static get label() { return 'locations'; }

	/** @type {GeoJSON.Position} */
	get coord() { return Position.from(this.position); }
	set coord(value) { this.position = value.toJSON(); }

	$formatDatabaseJson(json) {
		const forDatabase = Object.assign({}, json);
		if (forDatabase.position != null) {
			forDatabase.position = JSON.stringify(forDatabase.position);
		}
		return super.$formatDatabaseJson(forDatabase);
	}

	$parseDatabaseJson(json) {
		if (json.position != null && typeof json.position === 'string') {
			const position = JSON.parse(json.position);
			const result = Object.assign({}, json, { position });
			return super.$parseDatabaseJson(result);
		}

		return super.$parseDatabaseJson(json);
	}

	static get relationMappings() {
		return {
			field: {
				relation: Model.BelongsToOneRelation,
				modelClass: Field,
				join: {
					from: 'Location.fieldId',
					to: 'Field.id',
				},
			},
		};
	}
}
