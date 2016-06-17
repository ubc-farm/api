export default class Feature {
	get type() {return 'Feature'}
	constructor(geometry, properties, id) {
		Object.assign(this, {geometry, properties});
		if (id) this.id = id;
	}

	toJSON() {
		let {type, geometry, properties, id} = this;
		let json = {type, geometry, properties};
		if (id) json.id = id;
		return json;
	}
}