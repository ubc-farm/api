/* global google */
import {id} from '../../ubc-farm-utils/index.js';
import {changeActive, setAdding} from '../redux/actions.js';
import buildGrid from '../redux/build-grid-action.js';
import store from '../redux/store.js';
import drawManager from './drawing-manager.js';

/** 
 * Stores special data about the polygons on the map, including the 
 * @type {WeakMap<google.maps.Polygon, Object>}
 */
export const polygonData = new WeakMap();

/**
 * Reference polygons by ID
 * @type {Map<string, google.maps.Polygon>}
 */
const polygonRef = new Map();
export default polygonRef;

export function handlePolygonClick() {
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

	store.dispatch(setAdding(false));
	store.dispatch(buildGrid(polyID));
}

google.maps.event.addListener(drawManager, 
	'polygoncomplete', handleDrawnPolygon);