import {Model} from 'objection';

import {Field} from '../field.js'

/**
 * Represents a location. If field is specified, this location represents that
 * field.
 * @property {string} [name]
 * @property {float[]} [position] - a coordinate expressed as [x, y]
 * @property {string} [fieldId]
 */
export default class Location extends Model {
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

	parseDatabaseJson(json) {
		json = super.parseDatabaseJson(json);

		if (json.position) {

		}
		return json;
	}
}