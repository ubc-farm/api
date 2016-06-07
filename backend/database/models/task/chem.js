import {Model} from 'objection';
import Task from './';

import {Chemical} from '../reference.js';

export default class ChemicalTask extends Task {
	static get tableName() {return 'ChemicalTask'}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Chemical,
				join: {
					from: 'ChemicalTask.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

export class Fertilizing extends ChemicalTask {
	static get tableName() {return 'Fertilizing'}
}

export class PestControl extends ChemicalTask {
	static get tableName() {return 'PestControl'}
}