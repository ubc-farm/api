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
	updateState(
		oldState = {mode:null, polygons:null, geojson:null, focus:null}, 
		newState
	) {
		if (oldState === newState) return;

		if (diff(oldState.mode, newState.mode) !== undefined) {
			this.setMode(newState.mode);
		}

		const polygonDiff = diff(oldState.polygons, newState.polygons);
		if (polygonDiff !== undefined) {
			for (let polygonId in polygonDiff) {
				const polygonSpec = polygonDiff[polygon];

				if (polygonSpec === undefined) continue;
				else if (polygonSpec === REMOVED) {
					this.removePolygon(polygonId);
				} else {
					this._addPolygon(polygonSpec.polygon, polygonId);
				}
			}
		}

		if (oldState.geojson !== newState.geojson) {
			const oldTimestamp = newestTimestamp(Object.keys(oldState.geojson));
			const newTimestamp = newestTimestamp(Object.keys(newState.geojson));
			if (oldTimestamp !== newTimestamp) 
				this.updateData(newState.geojson[newTimestamp]);
		} 
		
		const focusDiff = diff(oldState.focus, newState.focus);
		if (focusDiff !== undefined) {
			if (focusDiff.polygon) 
				this.focusPolygon(oldState.focus.polygon, focusDiff.polygon);
			if (typeof focusDiff.resizing !== undefined) {
				this.resizePolygon(polygonId, focusDiff.resizing);
			}
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
	addPolygon(polygon =req(), id =req()) {
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
	 * @param {boolean} [editable=true] editable flag to use
	 * @returns {google.maps.Polygon}
	 */
	resizePolygon(id =req(), editable = true) {
		const poly = this.polygons.get(id);
		poly.setEditable(editable);
		return poly;
	}

	/**
	 * Focus on the polygon by ID
	 * @abstract
	 * @protected
	 * @param {string} [oldId] - ID of previously focused polygon
	 * @param {string} id - id of polygon to focus
	 * @returns {google.maps.Polygon}
	 */
	focusPolygon(oldId, id =req()) {return this.polygons.get(id);}

	/**
	 * Set the mode of the map
	 * @abstract
	 * @protected
	 * @param {string} newMode
	 */
	setMode(newMode =req()) {}

	/** Used by google.maps.Data to style features */
	static styler(feature) {
		if (feature.getProperty('isGrid')) {
			if (feature.getProperty('selected')) {
				return style.grid.selected;
			} else return style.grid.normal;
		}
	}
}