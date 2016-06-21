/**
 * Sub script for running grid related functions for the editor page
 */

import * as style from 'map/shapes/style.js';
import ModuleWorker from 'workers/promise/system.js';
import {Polygon} from 'geo/geojson/google-maps.js';
import Feature from 'geo/geojson/feature.js';
import FeatureCollection from 'geo/geojson/featurecollection.js';

/**
 * @module frontend/map/editor-grid-render
 */

/** 
 * Default settings for the grid 
 * @see module:frontend/workers/grid
 */
const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

export function styler(feature) {
	if (feature.getProperty('isGrid')) {
		if (feature.getProperty('selected')) {
			return style.grid.selected;
		} else return style.grid.normal;
	}
}

/**
 * Display a grid on the selected polygon
 * @param {google.maps.Polygon} polygon
 * @param {Object} gridOptions
 */
export function setActive(polygon, gridOptions) {
	polygon.gridOptions = gridOptions; //store the grid state with the polygon
	
	let map = polygon.getMap();
	return buildGrid(
		Polygon.fromGoogle(polygon), 
		gridOptions
	).then(grid => {
		//Flush the previous grid
		map.data.setMap(null);
		map.data = new google.maps.Data({map});
		map.data.setStyle(styler);
		
		//in case user made multiple polygons
		polygon.active = true;
		polygon.setOptions(style.field.selected);

		map.data.addGeoJson(grid);
	})
}

/**
 * Sends grid data off to a web worker then
 * resolves with a new grid data feature for the map
 * @param {GeoJSON.Polygon} path - path of containing polygon
 * @param {Object} [gridSpec]
 * @param {ModuleWorker} [worker] - override the worker
 * @see module:workers/grid.js
 * @returns {Promise<Data.FeatureOptions>} grid as a feature
 */
export function buildGrid(path, gridSpec = defaultGrid, 
worker = new ModuleWorker('workers/grid.js')) {
	gridSpec = Object.assign({}, defaultGrid, gridSpec);

	return worker.postMessage({path, gridSpec})
		.then(cells => cells.map(c => new Feature(c, {isGrid: true})))
		.then(features => new FeatureCollection(features));
}

/**
 * Uses a web worker to merge the polygons in the iterable.
 * @param {Iterable<GeoJSON.Polygon>} cells
 * @returns {Promise<Data.FeatureOptions>} merged cell grid
 */
export function mergeGrid(cells) {
	return new ModuleWorker('workers/subfield.js')
		.postMessage({cells: [...cells]})
		.then(polygon => {})
}