import Polygon from 'lib/geojson/polygon';
import * as style from './style.js';
import {diff, REMOVED, required as req} from 'lib/utils';
/*global google */

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

/**
 * Wrapper over a Google Maps map that links with a Redux store and checks for
 * differences in the store.
 * @alias module:app/googlemap-connector.default
 * @typicalname googlemap
 */
export default class GoogleMap {
	/**
	 * @param {Element|string} element or an element's ID
	 * @param {Redux.store} store
	 */
	constructor(element = req(), store =req()) {
		this.polygons = new Map(); //the collection kind of map
		if (typeof element == 'string') element = document.getElementById(element);

		/** 
		 * The Google Maps API map
		 * @memberof module:app/googlemap-connector.default#
		 * @protected
		 */
		this.map = new google.maps.Map(element, style.map);
		
		store.subscribe(() => {
			/** 
			 * Copy of the last seen branch of the store.
			 * @memberof module:app/googlemap-connector.default#
			 * @protected
			 */
			this.lastState = this.updateState(this.lastState, store.getState().map);
		});
	}

	/**
	 * Updates the state of the map using the differences of the given state
	 * @param {Object} [oldState]
	 * @param {Object} newState
	 * @returns {Object} newState
	 * @protected 
	 */
	updateState(oldState = {polygons:null, geojson:null}, newState) {
		if (oldState === newState) return;

		const polygonDiff = diff(oldState.polygons, newState.polygons);
		if (polygonDiff !== undefined) {
			for (const polygonId in polygonDiff) {
				const polySpec = polygonDiff[polygonId];

				if (polySpec === undefined) continue;
				else if (polySpec === REMOVED) this.removePolygon(polygonId);
				else {
					if (!this.polygons.has(polygonId)) 
						this.addPolygon(polygonId, polySpec)
					else {
						this.updatePolygonProps(polygonId, polySpec);
						this.updatePolygonPath(polygonId, 
							polySpec.polygon, newState.polygons[polygonId]);
					}
				}
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
	 * @param {Object} diff of the polygon state
	 * @returns {google.maps.Polygon}
	 */
	updatePolygonProps(id =req(), diff = {}) {
		const poly = this.polygons.get(id);
		const {editable, style: styleName} = diff;

		if (typeof editable !== 'undefined') poly.setEditable(editable);
		if (styleName) poly.setOptions(style.field[styleName]);
		return poly;
	}

	/**
	 * Edits the polygon path as nessecary
	 * @protected
	 * @param {string} id
	 * @param {Object} diff of the polygon geojson
	 * @param {Object} newGeoJson state
	 * @returns {google.maps.Polygon}
	 */
	updatePolygonPath(id = req(), geojsonDiff, newGeoJson) {
		const poly = this.poylgons.get(id); 
		const paths = poly.getPaths().getArray();
		if (geojsonDiff === undefined || geojsonDiff.coordinates === undefined) 
			return poly;
		else {
			for (const [index, diffPath] of geojsonDiff.coordinates.entries()) {
				if (diffPath === undefined) continue;
				
				let polyCounter = -1;
				for (const [posIndex, position] of diffPath.entries()) {
					polyCounter++;
					const polyPath = paths[polyCounter];
					if (position === undefined) continue;
					else if (position === REMOVED) {
						polyPath.splice(polyCounter, 1);
						polyCounter--;
					} else {
						polyPath[polyCounter] = newGeoJson.coordinates[index][posIndex];
					}
				}
				
			}
		}
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