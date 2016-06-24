import {Polygon, Feature, FeatureCollection} from 'lib/geojson';
import Map from './map.js';
import * as style from './style.js';

/** @enum */
const mode = {
	ADD: 'add',
	SELECT: 'select',
	RESIZE: 'resize'
}

const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

export default class PolygonEditor extends Map {
	constructor(node) {
		super(node);
		this.worker = new ModuleWorker('lib/autogrid/worker');
	}

	mode(newMode) {
		if (this._mode === newMode) return;
		else if (newMode === mode.ADD) {
			// let user draw on map
			this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON 
				|| 'polygon');
		} else if (newMode === mode.SELECT) {
			// let user click on map
			this.drawManager.setDrawingMode(null);
		} else if (newMode === mode.RESIZE) {
			// make polygon resizable
		}
	}

	/**
	 * Focuses on a polygon and displays a grid based on the given settings
	 * @param {google.maps.Polygon} polygon
	 * @param {Object} [gridOptions] 
	 * @returns {Promise<null>}
	 */
	focus(polygon, gridOptions = {}) {
		const gridSpec = Object.assign({}, 
			defaultGrid, polygon.gridOptions || {}, gridOptions);
		polygon.gridOptions = gridSpec;
		_activatePolygon(polygon);

		return this.worker
			.postMessage({path: Polygon.fromGoogle(polygon), gridSpec})
			.then(cells => cells.map(c => new Feature(c, {isGrid: true})))
			.then(features => new FeatureCollection(features))
			.then(cells => new FeatureCollection(cells.map(cell => new Feature(cell, 
				{isGrid: true}))))
			.then(grid => {
				this.clearDetails(); 
				_activatePolygon(polygon); 
				this.addDetail(grid);
			})
	}

	/** 
	 * Uses a web worker to merge the polygons together into a single one
	 * @todo
	 * @param {google.maps.Polygon[]} cells
	 * @returns {Promise<Data.FeatureOptions>} merged cell grid
	 */
	merge(cells) {
		return this.worker
			.postMessage({cells: cells.map(Polygon.fromGoogle)})
			.then(polygon => {})
	}
}

function _activatePolygon(polygon) {
	polygon.active = true;
	polygon.setOptions(style.field.selected);
}