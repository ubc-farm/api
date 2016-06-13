/**
 * Sub script for running grid related functions for the editor page
 */

import * as style from 'map/shapes/style.js';
import ModuleWorker from 'workers/promise/system.js';
import {displayGrid, convertCells} from 'map/shapes/draw.js';

/** 
 * Default settings for the grid 
 * @see module:workers/grid.js
 */
const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

/**
 * Display a grid on the selected polygon
 * @param {google.maps.Polygon} polygon
 * @param {Object} gridOptions
 */
export function setActive(polygon, gridOptions) {
	let gridOpts;
	if (polygon.gridOptions) gridOpts = polygon.gridOptions;
	else if (gridOptions) gridOpts = gridOptions;

	let path = polygon.getPath().getArray().map(point => {
		let {lng: x, lat: y} = point.toJSON();
		return {x, y};
	});
	path.push(path[0]);

	let map = polygon.getMap();
	return buildGrid(path, gridOpts).then(grid => {
		map.data.addGeoJson(grid);
	})
}

/**
 * Sends grid data off to a web worker then
 * resolves with a new grid data feature for the map
 * @param {Coordinate[]} path - path of containing polygon
 * @param {Object} [gridSpec]
 * @param {ModuleWorker} [worker] - override the worker
 * @see module:workers/grid.js
 * @returns {Promise<Data.FeatureOptions>} grid as a feature
 */
function buildGrid(path, gridSpec = defaultGrid, 
worker = new ModuleWorker('workers/grid.js')) {
	let name = JSON.stringify(path);

	return worker.postMessage({name, path, gridSpec})
		.then(cells => convertCells(cells, name))
		.then(features => createCollection(features))
}