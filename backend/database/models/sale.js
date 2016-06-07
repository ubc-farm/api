import {Model} from 'objection';

import Location from './ref/location.js';
export default class Sale extends Model {
	static get tableName() {return 'Sale'}
}

export class Grant extends Sale {
	static get tableName() {return 'Grant'}
}