import ShapeCollection from 'lib/collection';
import {Polygon} from 'lib/geojson'

/**
 * @extends module:lib/collection
 */
export default class PolygonCollection extends ShapeCollection {
	constructor(googlemap, iterable) {
		super(iterable);
		this.map = googlemap;
	}

	clone() {
		return new this.constructor(this.googlemap, this);
	}

	set(key, polygon) {
		if (polygon.getMap() !== this.map)
			polygon.setMap(this.map);
		super.set(key, polygon);
	}

	setJSON(key, polygonJson, style) {
		let poly = new google.maps.Polygon(style);
		poly.setPaths(Polygon.from(polygonJson).coordinates);
		poly.setMap(this.map);
		return super.set(key, poly);
	}

	addJSON(...args) {
		const key = this.constructor.id();
		const result = setJSON(key, ...args);
		return result && key;
	}
}