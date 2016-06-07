import {Model} from 'objection';

import {Location} from './field.js';
import {Program} from './reference.js';
import {Employee, Assignment} from './employee.js';
import {Equipment, EquipmentUsage} from './equipment.js';

export default class Task extends Model {
	static get tableName() {return 'Task'}

	static get relationMappings() {
		return {
			location: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			program: {
				relation: Model.OneToOneRelation,
				modelClass: Program,
				join: {
					from: 'Task.programId',
					to: 'Program.id'
				}
			},
			labour: {
				relation: Model.ManyToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Task.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_task',
						to: 'Assignment.assigned_employee'
					},
					to: 'Employee.id'
				}
			},
			equipment: {
				relation: Model.ManyToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Task.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.taskUsage',
						to: 'EquipmentUsage.equipment'
					},
					to: 'Equipment.id'
				}
			}
		}
	}
}

export class Seeding extends Model {
	static get tableName() {return 'Seeding'}
}

export class Irrigation extends Model {
	static get tableName() {return 'Irrigation'}
}

export class PestControl extends Model {
	static get tableName() {return 'PestControl'}
}

export class ScoutHarvest extends Model {
	static get tableName() {return 'ScoutHarvest'}
}

export class ScoutPest extends Model {
	static get tableName() {return 'ScoutPest'}
}

export class SoilSampling extends Model {
	static get tableName() {return 'SoilSampling'}
}