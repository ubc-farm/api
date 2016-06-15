import {Model} from 'objection';

import {Person as Company} from '../person';
import Equipment from '../equipment.js';

/**
 * Stores data about a type of item, such as its worth. More specific data,
 * like the quantity and storage location, is found in the Equipment table.
 * Items are meant to be reference information about any type of item rather
 * than a specific tractor or single apple.
 * @property {string} [name]
 * @property {string} [sku]
 * @property {string} [barcode]
 * @property {string} [supplierId] - id of the supplier of this item
 * @property {Object} [lifespan] - interval representing lifespan
 * @property {number} [value] - monentary value
 * @property {number} [salvageValue] 
 */
export default class Item extends Model {
	static get tableName() {return 'Item'}

	static get relationMappings() {
		return {
			/** Info about the supplier */
			supplier: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'Item.supplierId',
					to: 'Person.id'
				}
			},
			/** Equipment instances of this Item */
			equipment: {
				relation: Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Item.id',
					to: 'Equipment.product'
				}
			}
		}
	}
}
