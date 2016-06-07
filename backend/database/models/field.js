import {Model} from 'objection';
import {Plant} from './reference.js';

export class Field extends Model {
	static get tableName() {return 'Field'}
}

export class Crop extends Model {
	static get tableName() {return 'Crop'}
}

export class Location extends Model {
	static get tableName() {return 'Location'}
}