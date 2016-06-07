import {Model} from 'objection';
import {Item} from './reference.js';

import Sale from './sale.js';

export default class Equipment extends Model {
	static get tableName() {return 'Equipment'}

	static get relationMappings() {
		return {
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
			}
		}
	}
}

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