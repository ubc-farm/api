/**
 * Sub script for running grid related functions for the editor page
 */

import * as style from 'map/shapes/style.js';
import ModuleWorker from 'workers/promise/system.js';
import {displayGrid, convertCells} from 'map/shapes/draw.js';

const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

export function worker() {
	return new ModuleWorker('workers/grid.js');
}

/**
 * Display a grid on the selected polygon
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
	return buildGridData(path, gridOpts).then(grid => {
		map.data.add(grid);
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
function buildGrid(path, gridSpec = defaultGrid, worker = worker()) {
	let name = JSON.stringify(path);

	return worker.postMessage({name, path, gridSpec})
		.then(convertCells)
		.then(cells => displayGrid(cells, name))
}