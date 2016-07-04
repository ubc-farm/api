import {Polygon, Feature, FeatureCollection} from 'lib/geojson';
import ModuleWorker from 'lib/module-worker';
import GoogleMap, {Mode, actions} from 'app/google-map';
import * as style from './style.js';
import Selector from './selector.js'
import store from 'app/store';

export const defaultGrid = {
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
};

export default class PolygonEditor extends GoogleMap {
	constructor(element) {
		super(element, store);
		this.worker = new ModuleWorker('lib/autogrid/worker');
		this.drawManager = new google.maps.drawing.DrawingManager({
			drawingControl: false,
			polygonOptions: style.field.normal
		});
		this.selector = new Selector(this._map);
		google.maps.event.addListener(this.drawManager, 
			'polygoncomplete', poly => this.initPolygon(poly));
	}

	/**
	 * Set the mode of the map
	 * @protected
	 * @param {string} newMode
	 */
	setMode(newMode) {
		const setDrawingMode = mode => this.drawManager.setDrawingMode(mode);
		switch (super(newMode)) {
			case Mode.ADD: 
				setDrawingMode(google.maps.drawing.OverlayType.POLYGON); 
				break;
			case Mode.SELECT:
				setDrawingMode(null); 
				break;
		}
	}

	/**
	 * Focuses on a polygon and displays a grid based on the given settings
	 * @param {string} [oldId] - ID of previously focused polygon
	 * @param {string} id - id of polygon to focus
	 * @param {Object} gridSpec settings
	 * @returns {Promise<null>}
	 */
	focusPolygon(oldId, id) {
		this.polygons.get(oldId).setOptions(style.field.normal);

		const poly = this.polygons.get(id);
		poly.setOptions(style.field.selected);

		store.dispatch( buildGrid(id, Date.now()) )
			.then(() => poly.setOptions(style.field.selected));
	}

	initPolygon(polygon) {
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