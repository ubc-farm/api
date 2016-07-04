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
	applyMode(newMode) {
		const setDrawingMode = mode => this.drawManager.setDrawingMode(mode);
		switch (newMode) {
			case Mode.ADD: 
				setDrawingMode(google.maps.drawing.OverlayType.POLYGON); 
				break;
			case Mode.SELECT:
				setDrawingMode(null); 
				break;
		}
	}

	/**
	 * Add polygons to state after they have been created by the user
	 * @protected
	 * @param {google.maps.Polygon} polygon
	 */
	initPolygon(polygon) {
		store.dispatch(actions.addPolygon(polygon, Symbol('Polygon Identifier')))
		google.maps.event.addListener(polygon, 'click', 
			function() {
				store.dispatch(actions.buildGrid(this.id, Date.now()));
			}
		);
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