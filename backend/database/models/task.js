import {Model} from 'objection';

export default class Task extends Model {
	static get tableName() {return 'Task'}
}

export class Seeding extends Model {
	static get tableName() {return 'Seeding'}
}

export class Irrigation extends Model {
	static get tableName() {return 'Irrigation'}
}

export class PestControl extends Model {
	static get tableName() {return 'PestControl'}
}

export class ScoutHarvest extends Model {
	static get tableName() {return 'ScoutHarvest'}
}

export class ScoutPest extends Model {
	static get tableName() {return 'ScoutPest'}
}

export class SoilSampling extends Model {
	static get tableName() {return 'SoilSampling'}
}