import {Model} from 'objection';
import {Person} from './person.js';

export class Employee extends Person {
	static get tableName() {return 'Employee'}
}

export class Assignment extends Model {
	static get tableName() {return 'Assignment'}
}