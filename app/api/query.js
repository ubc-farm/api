import {QueryBuilder as ObjectionQueryBuilder} from 'objection';

export default class QueryBuilder extends ObjectionQueryBuilder {
	/**
	 * @param {Object} query from Hapi request.query
	 */
	constructor(query) {
		super();
		const {orderBy, limitToFirst, limitToLast, startAt, endAt, equalTo} = query;
		if (orderBy) {
			
		}
	}
}