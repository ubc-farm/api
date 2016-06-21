export default class Geometry {
	toJSON() {
		const {type, coordinates} = this;
		return {type, coordinates};
	}
	
	static parse(geojson, SubClass) {
		return Object.assign(new SubClass(), geojson);
	}
}