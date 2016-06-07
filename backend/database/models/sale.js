import {Model} from 'objection';

export default class Sale extends Model {
	static get tableName() {return 'Sale'}
}

export class Grant extends Sale {
	static get tableName() {return 'Grant'}
}