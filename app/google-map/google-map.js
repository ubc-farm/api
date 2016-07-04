import Polygon from 'lib/geojson/polygon';
import * as style from './style.js';
import {id, diff, REMOVED, required as req} from 'lib/utils';
import Mode from './mode.js';

/**
 * Returns the largest number string in an array of number strings
 * @param {string[]} timestamps - timestamp strings representing milliseconds 
 * from the enoch. The strings are coerced into numbers and sorted to obtain
 * the largest number.
 * @returns {string} largest timestamp
 */
function newestTimestamp(timestamps) {
	if (!Array.isArray(timestamps)) 
		throw TypeError('timestamps must be an array. Did you use Object.keys()?');
	return timestamps.sort((a, b) => parseInt(b) - parseInt(a))[0];
}

export default class GoogleMap {
	/**
	 * @param {Element|string} element or an element's ID
	 * @param {Redux.store} store
	 */
	constructor(element, store) {
		this.polygons = new Map(); //the collection kind of map
		if (typeof element == "string") element = document.getElementById(element);
		this.map = new google.maps.Map(element, style.map);
		store.subscribe(() => {
			this.lastState = this.updateState(this.lastState, store.getState());
		});
		this.dispatch = store.dispath;
	}

	/**
	 * Updates the state of the map using the differences of the given state
	 * @param {Object} [oldState]
	 * @param {Object} newState
	 * @returns {Object} newState
	 */
	updateState(oldState = {polygons:null, geojson:null}, newState) {
		if (oldState === newState) return;

		const polygonDiff = diff(oldState.polygons, newState.polygons);
		if (polygonDiff !== undefined) {
			for (let polygonId in polygonDiff) {
				const polySpec = polygonDiff[polygon];

				if (polySpec === undefined) continue;
				else if (polySpec === REMOVED) this.removePolygon(polygonId);
				else this.updatePolygon(polygonId, polySpec);
			}
		}

		if (oldState.geojson !== newState.geojson) {
			const oldTimestamp = newestTimestamp(Object.keys(oldState.geojson));
			const newTimestamp = newestTimestamp(Object.keys(newState.geojson));
			if (oldTimestamp !== newTimestamp) 
				this.updateData(newState.geojson[newTimestamp]);
		} 

		return newState;
	}

	/**
	 * Clears the current data layer and replaces it with the new
	 * GeoJSON data provided
	 * @param {GeoJSON.Feature} newData
	 * @returns {google.maps.Data}
	 */
	updateData(newData) {
		this.map.data.setMap(null);
		this.map.data = new google.maps.Data({map: this.map});
		this.map.data.setStyle(GoogleMap.styler);
		this.map.data.addGeoJson(newData);
		return this.map.data;
	}

	/**
	 * Adds the given polygon to the map
	 * @protected
	 * @param {GeoJSON.Polygon|google.maps.Polygon} polygon
	 * @param {string} id
	 * @returns {google.maps.Polygon} added polygon
	 */
	addPolygon(id =req(), polygon =req()) {
		let poly; 
		if (polygon instanceof google.maps.Polygon) {
			poly = polygon;
		} else {
			poly = new google.maps.Polygon(style.field.normal);
			poly.setPaths(Polygon.from(polygon).coordinates);
		}
		if (poly.getMap() !== this.map) poly.setMap(this.map);
		poly.id = id;
		this.polygons.set(id, poly);
		return poly;
	}

	/**
	 * Removes the polygon from the map by its ID
	 * @protected
	 * @param {string} id
	 * @returns {google.maps.Polygon} removed polygon
	 */
	removePolygon(id =req()) {
		const poly = this.polygons.get(id);
		poly.setMap(null);
		this.polygons.delete(id);
		return poly;
	}

	/**
	 * Sets the editable property of the polygon
	 * @protected
	 * @param {string} id
	 * @param {Object} props
	 * @returns {google.maps.Polygon}
	 */
	updatePolygon(id =req(), props = {}) {
		const poly = this.polygons.get(id);
		const {editable, style: styleName, polygon: geoPoly} = props;
		if (poly === undefined) return this.addPolygon(id, geoPoly);

		if (typeof editable !== 'undefined') poly.setEditable(editable);
		if (styleName) poly.setOptions(style.field[styleName]);
		if (geoPoly) poly.setPaths(Polygon.from(geoPoly).coordinates);
		return poly;
	}

	/** Used by google.maps.Data to style features */
	static styler(feature) {
		if (feature.getProperty('isGrid')) {
			if (feature.getProperty('selected')) {
				return style.grid.selected;
			} else return style.grid.normal;
		}
	}
}