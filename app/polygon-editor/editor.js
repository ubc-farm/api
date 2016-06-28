import {Polygon, Feature, FeatureCollection} from 'lib/geojson';
import ModuleWorker from 'lib/module-worker';
import GoogleMap from 'app/google-map';
import * as style from './style.js';
import Selector from './selector.js'

/** @enum */
const mode = {
	ADD: 'add',
	SELECT: 'select',
	RESIZE: 'resize'
}

export const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

export default class PolygonEditor extends GoogleMap {
	constructor(node, dialogNode) {
		super(node);
		this.gridSpecs = new Map();
		this.worker = new ModuleWorker('lib/autogrid/worker');
		this.drawManager = new google.maps.drawing.DrawingManager({
			drawingControl: false,
			polygonOptions: style.field.normal
		});
		this.selector = new Selector(this._map);
		google.maps.event.addListener(this.drawManager, 
			'polygoncomplete', poly => this.add(poly))
		
		if (dialogNode) {
			this.dialog = ReactDOM.render(r(EditorDialog, {
				onSubmit: this.focus,
				onSwitch: this.mode
			}), dialogNode);
		}
	}

	mode(newMode) {
		if (this._mode === newMode) return;
		else if (newMode === mode.ADD) {
			// let user draw on map
			this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
		} else if (newMode === mode.SELECT) {
			// let user click on map
			this.drawManager.setDrawingMode(null);
		} else if (newMode === mode.RESIZE) {
			// make polygon resizable
		}
	}

	/**
	 * Focuses on a polygon and displays a grid based on the given settings
	 * @param {string} id
	 * @param {Object} [gridOptions] - override existing settings
	 * @returns {Promise<null>}
	 */
	focus(id, gridOptions = {}) {
		const gridSpec = Object.assign({}, defaultGrid, 
			this.gridSpecs.get(id) || {}, gridOptions);
		this.gridSpecs.set(id, gridSpec);

		if (this.dialog) Object.assign(this.dialog, {id, gridSpec});

		const polygon = this.polygons.get(id);
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

	add(polygon) {
		super.add(polygon);
		google.maps.event.addListener(polygon, 'click', 
			function() {focus(this.id)});
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
	if (this._focused && this._focused != polygon)
		this._focused.setOptions(style.field.normal);
	this._focused = polygon;
	polygon.setOptions(style.field.selected);
	this.mode('select');
}