import Polygon from 'lib/geojson/polygon';
import * as style from './style.js';
import {id} from 'lib/utils';

export default class GoogleMap {
	constructor(node) {
		this.polygons = new Map(); //the collection kind of map
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
		let poly; const id = id();
		if (polygon.getMap() == this._map) {
			poly = polygon;
		} else {
			poly = new google.maps.Polygon(style.field.normal);
			poly.setPaths(Polygon.from(polygon).coordinates);
			poly.setMap(this._map);
		}
		poly.id = id;
		this.polygons.set(id, poly);
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