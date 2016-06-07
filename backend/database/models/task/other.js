import {Model} from 'objection';
import Task from './task.js';

import {Person as Company} from './person.js';
import {Chemical} from './reference.js';

export class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
}

export class PestControl extends Task {
	static get tableName() {return 'PestControl'}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Chemical,
				join: {
					from: 'PestControl.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

export class SoilSampling extends Task {
	static get tableName() {return 'SoilSampling'}

	static get relationMappings() {
		return Object.assign({
			samplingCompany: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'SoilSampling.company',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}