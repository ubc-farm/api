import {Polygon, Feature, FeatureCollection} from 'lib/geojson';
import ModuleWorker from 'lib/module-worker';
import GoogleMap, {Mode, actions} from 'app/google-map';
import * as style from './style.js';
import Selector from './selector.js'
import store from 'app/store';
/* global google */

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
		this.listeners = new Map();
		this.selector = new Selector(this._map);
		google.maps.event.addListener(
			this.drawManager, 'polygoncomplete', 
			poly => store.dispatch(
				actions.addPolygon(poly, Symbol('Polygon Identifier'))
			)
		);
	}

	updateState(
		oldState = {polygons:null, geojson:null, mode:null}, 
		newState
	) {
		super.updateState(oldState, newState);
		if (oldState.mode !== newState.mode) this.applyMode(newState.mode);
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
	 * Adds the given polygon to the map and attaches event listeners
	 * for editing the path and clicking on the polygon
	 * @param {GeoJSON.Polygon|google.maps.Polygon} polygon
	 * @param {string} id
	 * @returns {google.maps.Polygon} added polygon
	 */
	addPolygon(id, polygon) {
		let poly = super.addPolygon(id, polygon);

		const existingListeners = this.listeners.get(id) || [];
		for (let listener in existingListeners) listener.remove();

		let newListeners = [];
		poly.getPaths().forEach((path, pathIndex) => {
			const insertListener = google.maps.event.addListener(
				path, 'insert_at', 
				insertIndex => this.updatePath('add', insertIndex, pathIndex, poly)
			);
			const removalListener = google.maps.event.addListener(
				path, 'remove_at',
				removedIndex => this.updatePath('remove', removedIndex, pathIndex, poly)
			);
			const adjustmentListener = google.maps.event.addListener(
				path, 'set_at',
				adjustedIndex => this.updatePath('edit', adjustedIndex, pathIndex, poly)
			);
			newListeners.push(insertListener, removalListener, adjustmentListener);
		});

		const clickListener = google.maps.event.addListener(
			poly, 'click',
			function() { store.dispatch(actions.buildGrid(this.id, Date.now())) }
		);
		newListeners.push(clickListener);

		this.listener.set(id, newListeners);
		return poly;
	}

	updatePath(action, index, pathIndex, polygon) {
		
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