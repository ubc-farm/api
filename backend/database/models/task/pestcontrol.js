import {Model} from 'objection';
import Task from './';

import {Chemical} from '../reference.js';

export default class PestControl extends Task {
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