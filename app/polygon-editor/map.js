import Polygon from 'lib/geojson/polygon';
import * as style from './style.js';

export default class Map {
	constructor(node) {
		if (typeof node == "string") node = document.getElementById(node);
		this._map = new google.maps.Map(node, style.map);
	}

	clearDetails() {
		this._map.data.setMap(null);
		this._map.data = new google.maps.Data({map: this._map});
		this._map.data.setStyle(_styler);
	}

	/**
	 * @param {GeoJSON.Feature}
	 */
	addDetail(data) {return this._map.data.addGeoJson(data)}

	/**
	 * @param {GeoJSON.Polygon}
	 */
	add(polygon) {
		let poly = new google.maps.Polygon(style.field.normal);
		poly.setPaths(Polygon.from(polygon).coordinates);
		poly.setMap(this._map);
		return poly;
	}
}

function _styler(feature) {
	if (feature.getProperty('isGrid')) {
		if (feature.getProperty('selected')) {
			return style.grid.selected;
		} else return style.grid.normal;
	}
}