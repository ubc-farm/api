import {Model} from 'objection';
import Task from './task.js';

export class Seeding extends Task {
	static get tableName() {return 'Seeding'}
}

export class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
}

export class PestControl extends Task {
	static get tableName() {return 'PestControl'}
}

export class ScoutHarvest extends Task {
	static get tableName() {return 'ScoutHarvest'}
}

export class ScoutPest extends Task {
	static get tableName() {return 'ScoutPest'}
}

export class SoilSampling extends Task {
	static get tableName() {return 'SoilSampling'}
}