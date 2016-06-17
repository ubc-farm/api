import {Model} from 'objection';
import Person from './';

/**
 * Represents a researcher working at the farm. Extends person with extra
 * faculty data, and links to ResearchProjects.
 * @module backend/database/models/person/research
 * @extends Person
 * @property {string} [position]
 * @property {string} [faculty] such as 'Land and Food Systems' or 'Science'
 * @property {string} [department] such as 'Applied Biology' or 'Mathematics'
 * @property {string} [labWebsite]
 * @property {string} [expertise]
 * @property {string[]} [coursesTaught]
 * @property {string} [projects]
 */
export class Researcher extends Person {
	static get tableName() {return 'Researcher'}

	static get relationMappings() {
		return Object.assign({
			/** Projects where this researcher is a lead */
			projects: {
				relation: Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					to: 'ResearchProject.researcher'
				}
			},
			/** Projects where this researcher is a partner */
			partnerProjects: {
				relation: Model.ManyToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.person',
						to: 'ResearchPartner.project'
					},
					to: 'ResearchProject.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Represents a research project at the farm, with a lead researcher and 
 * possible partner researchers and members.
 * @property {string} researcher - id of the lead researcher
 * @property {string} [title] of the project
 * @property {Date[]} [date] - range indicating start and end date of project
 * @property {number} [postDocs=0], number of
 * @property {number} [phds=0], number of
 * @property {number} [masters=0], number of
 * @property {number} [bachelors=0], number of
 * @property {number} [others=0] - number of other people working on the project
 * @property {number} [grantValue] 
 * @property {string} [grantSource]
 * @property {string[]} [publications=[]]  
 */
export class ResearchProject extends Model {
	static get tableName() {return 'ResearchProject'}

	/**
	 * Returns the total number of members working on the project
	 */
	memberCount() {
		return this.postDocs + this.phds 
		     + this.masters + this.bachelors
				 + this.others;
	}

	static get relationMappings() {
		return {
			/** Link to the lead researcher */
			lead: {
				relation: Model.OneToOneRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.researcher',
					to: 'Researcher.id'
				}
			},
			/** Links to the partner researchers */
			partners: {
				relation: Model.ManyToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.project',
						to: 'ResearchPartner.person'
					},
					to: 'Researcher.id'
				}
			}
		}
	}
}

/**
 * Helper table to join ResearchProjects with their partner Researchers
 */
export class ResearchPartner extends Model {
	static get tableName() {return 'ResearchPartner'}

	static get relationMappings() {
		return {
			researcher: {
				relation: Model.OneToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchPartner.person',
					to: 'Researcher.id'
				}
			},
			researchProject: {
				relation: Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'ResearchPartner.project',
					to: 'ResearchProject.id'
				}
			}
		}
	}
}