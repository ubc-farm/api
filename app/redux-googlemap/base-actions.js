import Polygon from 'lib/geojson/polygon';

export const ADD_POLYGON = 'ADD_POLYGON';
export const FOCUS_POLYGON = 'FOCUS_POLYGON';
export const ADD_POLYGON_GRID = 'ADD_POLYGON_GRID';
export const MERGE_POLYGON_GRID = 'MERGE_POLYGON_GRID';
export const ADD_GEOJSON = 'ADD_GEOJSON';
export const REMOVE_GEOJSON = 'REMOVE_GEOJSON';
export const CLEAR_GEOJSON = 'CLEAR_GEOJSON';
export const CHANGE_MAP_MODE = 'CHANGE_MAP_MODE';

/** @enum */
export const Mode = {
	ADD: 'add',
	SELECT: 'select',
	RESIZE: 'resize'
}

export function addPolygon(polygon, id) {
	if (!polygon instanceof Polygon)
		polygon = Polygon.fromGoogle(polygon);
	return {
		type: ADD_POLYGON,
		polygon,
		id
	}
}

export function focusPolygon(id) {
	return { type: FOCUS_POLYGON,	id }
}

export function addPolygonGrid(id) {
	return { type: ADD_POLYGON_GRID, id	}
}

export function mergePolygonGrid(gridCellIds) {
	return { type: MERGE_POLYGONS, ids: gridCellIds	}
}

export function addGeoJsonWithoutCheck(geojson, timestamp) {
	return { type: ADD_GEOJSON, geojson, timestamp }
}

export function removeGeoJson(timestampId) {
	return { type: REMOVE_GEOJSON, timestamp: timestampId }
}

export function clearGeoJson() {
	return { type: CLEAR_GEOJSON }
}

export function changeMapMode(mode) {
	return { type: CHANGE_MAP_MODE,	payload: mode }
}