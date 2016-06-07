import {Model} from 'objection';
import Person from './';

export class Researcher extends Person {
	static get tableName() {return 'Researcher'}

	memberCount() {
		return this.postDocs + this.phds 
		     + this.masters + this.bachelors
				 + this.others;
	}

	static get relationMappings() {
		return Object.assign({
			projects: {
				relation: Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					to: 'ResearchProject.researcher'
				}
			},
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

export class ResearchProject extends Model {
	static get tableName() {return 'ResearchProject'}

	static get relationMappings() {
		return {
			lead: {
				relation: Model.OneToOneRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.researcher',
					to: 'Researcher.id'
				}
			},
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