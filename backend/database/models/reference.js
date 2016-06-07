import {Model} from 'objection';

export class Item extends Model {
	static get tableName() {return 'Item'}
}

export class Plant extends Item {
	static get tableName() {return 'Plant'}
}

export class Program extends Model {
	static get tableName() {return 'Program'}
}

export class Chemical extends Model {
	static get tableName() {return 'Program'}
}

export class Account extends Model {
	static get tableName() {return 'Program'}
}