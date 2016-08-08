/* global google */
import {id} from '../../ubc-farm-utils/index.js';
import {changeActive} from '../redux/actions.js';
import store from '../redux/store.js';
import map from './map.js';
import drawManager from './drawing-manager.js';

/** 
 * Stores special data about the polygons on the map, including the 
 * @type {WeakMap<google.maps.Polygon, Object>}
 */
const polygonData = new WeakMap();

/**
 * Reference polygons by ID
 * @type {Map<string, google.maps.Polygon>}
 */
const polygonRef = new Map();

function handlePolygonClick() {
	const {id} = polygonData.get(this);
	store.dispatch(changeActive(id));
}

function handleDrawnPolygon(polygon) {
	const polyID = id();
	polygonData.set(polygon, {
		id: polyID,
		clickListener: google.maps.event.addListener(
			polygon, 'click', handlePolygonClick
		)
	});
	polygonRef.set(polyID, polygon);
}