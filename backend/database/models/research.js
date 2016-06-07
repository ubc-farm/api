import {Model} from 'objection';
import {Person} from './person.js';

export class Researcher extends Person {
	static get tableName() {return 'Researcher'}
}

export class ResearchProject extends Model {
	static get tableName() {return 'ResearchProject'}
}

export class ResearchPartner extends Model {
	static get tableName() {return 'ResearchPartner'}
}