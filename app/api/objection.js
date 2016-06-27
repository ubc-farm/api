export default class ObjectionRoute {
	constructor(model) {
		this.Model = model;
		this.path = '/api/' + model.tableName;
	}

	getAll(query = {}) {
		const {auth, print, shallow, orderBy} = query;
		const {idColumn, tableName} = this.Model;
		return this.Model.query()
			.then(rows => {
				let result = {};
				for (let row of rows) result[row[idColumn]] = row;
				return result;
			}).then(r => {
				let result = {};
				result[tableName] = r;
				return result;
			})
	}
}