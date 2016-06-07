import {Model} from 'objection';

import {Person as Company} from './person'
import Task from './task'
import Equipment from './equipment.js'
import {Crop} from './field.js'
import ChemicalTask from './task/chem.js'

export class Item extends Model {
	static get tableName() {return 'Item'}

	static get relationMappings() {
		return {
			supplier: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'Item.supplierId',
					to: 'Person.id'
				}
			},
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

export class Plant extends Item {
	static get tableName() {return 'Plant'}

	static get relationMappings() {
		return {
			crops: {
				relation: Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Plant.id',
					to: 'Crop.type'
				}
			}
		}
	}
}

export class Program extends Model {
	static get tableName() {return 'Program'}

	static get relationMappings() {
		return {
			link: {
				relation: Model.OneToOneRelation,
				modelClass: Account,
				join: {
					from: 'Program.linkedAccount',
					to: 'Account.id'
				}
			},
			tasks: {
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'Program.id',
					to: 'Task.programId'
				}
			}
		}
	}
}

export class Chemical extends Model {
	static get tableName() {return 'Chemical'}

	static get relationMappings() {
		return {
			usage: {
				relation: Model.OneToManyRelation,
				modelClass: ChemicalTask,
				join: {
					from: 'Chemical.id',
					to: 'ChemicalTask.product'
				}
			}
		}
	}
}

export class Account extends Model {
	static get tableName() {return 'Account'}

	static get relationMappings() {
		return {
			programs: {
				relation: Model.OneToManyRelation,
				modelClass: Program,
				join: {
					from: 'Account.id',
					to: 'Program.linkedAccount'
				}
			}
		}
	}
}