import Polygon from 'lib/geojson/polygon';
import * as style from './style.js';
import {id} from 'lib/utils';
import {Mode} from './base-actions.js'
//import google from 'google/maps';

export const DRAWING_MODE = 'DRAWING_MODE';
export const CHANGE_FEATURE = 'CHANGE_FEATURE';

export default class GoogleMapConnector {
	constructor(receiver, subscribe, getState) {
		this.polygons = new Map(); this.features = {};
		this.focused = '';
		this.receiver = receiver;
		this.lastState = {};
		subscribe(() => {
			const state = getState();
			const {mode, polygons, geojson, focus} = state;
			if (state === this.lastState) return;
			if (polygons !== this.lastState.polygons)
				updatePolygons(polygons, this.polygons);
			if (mode !== this.lastState.mode)
				updateMode(mode);
			if (focus !== this.lastState.focus) 
				updateFocusedPolygon(focus, this.focused, this.polygons);
			if (geojson !== this.lastState.geojson)
				updateFeatures(geojson, this.features);
			this.lastState = state;
		});
	}

	updatePolygons(newState, polygonMap) {
		
	}

	updateFocusedPolygon(newFocusId, previousFocusId, polygonMap) {

	}

	updateMode(newMode) {
		if (newMode === Mode.ADD)
			this.receiver.postMessage({type: DRAWING_MODE, payload: 'polygon'});
		else if (newMode === Mode.SELECT)
			this.receiver.postMessage({type: DRAWING_MODE, payload: null});
		else if (newMode === Mode.RESIZE) {

		}
	}

	updateFeatures(newState, features) {
		this.receiver.postMessage({type: CHANGE_FEATURE, payload: newState});
	}
}