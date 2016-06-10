/**
 * Sub script for running grid related functions for the editor page
 */

import * as style from 'map/shapes/style.js';
import ModuleWorker from 'workers/promise/system.js';
import GridSelector from 'map/shapes/select.js';

export default class GridBuilder {
	constructor(map, defaultGridOptions) {
		this.map = map;
		this.defaultGrid = defaultGridOptions || {
			width: 2, height: 2,
			angle: 25,
			widthSpecific: [], heightSpecific: []
		};
		this.worker = new ModuleWorker('workers/grid.js');
	}

	/**
	 * Display a grid on the selected polygon
	 */
	setActive(polygon, gridOptions) {
		let gridOpts;
		if (polygon.gridOptions) gridOpts = polygon.gridOptions;
		else if (gridOptions) gridOpts = gridOptions;

		let path = polygon.getPath().getArray().map(point => {
			let {lng: x, lat: y} = point.toJSON();
			return {x, y};
		});
		path.push(path[0]);

		return this.buildGridData(path, gridOpts).then(grid => {
			this.map.data.add(grid);
		})
	}

	/**
	 * Process the path within a web worker
	 */
	buildGridData(path, gridSpec) {
		gridSpec = gridSpec || this.defaultGrid;
		return this.worker.postMessage({
			name: JSON.stringify(path), //@todo create ID for polygon
			path, 
			gridSpec
		})
	}
}