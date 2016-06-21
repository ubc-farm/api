export default class Geometry {
	toJSON() {
		let {type, coordinates} = this;
		return {type, coordinates};
	}
	
	static parse(geojson, SubClass) {
		let geometry = new SubClass();
		Object.assign(geometry, geojson);
		return geometry;
	}
}