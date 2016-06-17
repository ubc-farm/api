import {Model} from 'objection';
import Item from './ref/item.js';

import Sale from './sale.js';
import Location from './ref/location.js';

/**
 * Represents an item in the inventory, with fields like the amount stored and 
 * its location. While the table is named Equipment, this can also represent
 * other stored items like harvested crops or seeds.
 * @property {string} product - the type of item this equipment is
 * @property {string} location - where this equipment is stored
 * @property {number} [quantity]
 * @property {Date} [purchaseDate] - may be populated by purchase (Sale) info
 * @property {string} [description]
 */
export default class Equipment extends Model {
	static get tableName() {return 'Equipment'}

	static get relationMappings() {
		return {
			/** Sale data related to this equipment */
			sales: {
				relation: Model.ManyToManyRelation,
				modelClass: Sale,
				join: {
					from: 'Equipment.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.equipment',
						to: 'EquipmentUsage.sellingUsage'
					},
					to: 'Sale.id'
				}
			},
			/** Tasks this equipment is being used for */
			tasks: {
				relation: Model.ManyToManyRelation,
				modelClass: Task,
				join: {
					from: 'Equipment.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.equipment',
						to: 'EquipmentUsage.taskUsage'
					},
					to: 'Task.id'
				}
			},
			/** The location where this equipment is stored */
			loc: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Equipment.location',
					to: 'Location.id'
				}
			},
			/** The type of item this equipment is */
			item: {
				relation: Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Equipment.product',
					to: 'Item.id'
				}
			}
		}
	}
}

/**
 * A helper table for joining equipment to some usage
 */
export class EquipmentUsage extends Model {
	static get tableName() {return 'EquipmentUsage'}

	static get relationMappings() {
		return {
			eqiupmentUsed: {
				relation: Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'EquipmentUsage.equipment',
					to: 'Equipment.id'
				}
			},
			forSelling: {
				relation: Model.OneToManyRelation,
				modelClass: Sale,
				join: {
					from: 'EquipmentUsage.sellingUsage',
					to: 'Sale.id'
				}
			},
			forTask: {
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'EquipmentUsage.taskUsage',
					to: 'Task.id'
				}
			}
		}
	}
}