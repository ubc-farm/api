import {Model} from 'objection';
import {Item} from './reference.js';

export class Equipment extends Model {
	static get tableName() {return 'Equipment'}
}

export class EquipmentUsage extends Model {
	static get tableName() {return 'Equipment'}
}