import {Model} from 'objection';
import Task from './';

import {Person as Company} from '../person';

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