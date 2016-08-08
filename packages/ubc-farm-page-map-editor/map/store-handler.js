/* global google */
import store from '../redux/store.js';
import map from './map.js';
import drawingManager from './drawing-manager.js';
import polygonRef from './polygons.js';
import {field as fieldStyle} from './style.js';

/**
 * @param {Iterable<V>} source
 * @param {Set<V>} against
 * @returns {Set<V>} items removed in against
 */
function diffSets(source, against) {
	let results = new Set();
	for (const value of source) 
		if (!against.has(value)) results.add(value);
	return results;
}

class MapStoreListener {
	/** @param {Map<string, google.maps.Polygon>} polygonRef */
	constructor() { 
		this.state = undefined;
		this.polygons = polygonRef;
	}

	handleActive() {
		const {active} = store.getState(), {state} = this;
		if (active !== state.active) {
			const last = this.polygons.get(state.active);
			const next = this.polygons.get(active);
			last.setOptions(fieldStyle.normal);
			next.setOptions(fieldStyle.selected);
		}
	}

	handleMeta() {
		const {mapMeta} = store.getState();
		if (mapMeta !== this.state.mapMeta) {
			const newMode = mapMeta.adding 
				? google.maps.drawing.OverlayType.POLYGON || 'polygon'
				: null;

			drawingManager.setDrawingMode(newMode);
		}
	}

	handleGeoJson() {
		const {fieldData} = store.getState(), {state} = this;
		if (fieldData !== state.fieldData) {
			const toRemove = diffSets(
				map.data.keys(), 
				new Set(state.fieldData.features.map(f => f.id))
			);
			for (const removeId of toRemove) 
				map.data.remove(map.data.getId(removeId));
			
			map.data.addGeoJson(fieldData);
		}
	}

	handleGridForm() {
		const {gridForm} = store.getState(), last = this.state.gridForm;
		if (gridForm !== last) {
			for (const [id, field] of gridForm) {
				const lastField = last.get(id);

				const {resizing} = field;
				if (resizing !== lastField.resizing)
					this.polygons.get(id).editable = resizing; 
			}
		}
	}

	listener() {
		const newState = store.getState(), {state} = this;
		if (newState === state) return;

		this.handleActive(); this.handleMeta();
		this.handleGeoJson(); this.handleGridForm();

		this.state = newState;
	}
}

new MapStoreListener();