/**
 * An object containing a geometry and some other properties
 * @alias module:lib/geojson.Feature
 */
export default class Feature {
	get type() {return 'Feature'}

	/**
	 * @param {Geometry} geometry
	 * @param {Object} properties
	 * @param {any} [id]
	 */
	constructor(geometry, properties, id) {
		Object.assign(this, {geometry, properties});
		if (id) this.id = id;
	}

	/** @returns {Object} */
	toJSON() {
		const {type, geometry, properties, id} = this;
		let json = {type, geometry, properties};
		if (id) json.id = id;
		return json;
	}
}