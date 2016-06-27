import Polygon from 'lib/geojson/polygon';

export const ADD_POLYGON = Symbol('ADD_POLYGON');
export const FOCUS_POLYGON = Symbol('FOCUS_POLYGON');
export const ADD_POLYGON_GRID = Symbol('ADD_POLYGON_GRID');
export const MERGE_POLYGON_GRID = Symbol('MERGE_POLYGON_GRID');
export const ADD_GEOJSON = Symbol('ADD_GEOJSON');
export const CLEAR_GEOJSON = Symbol('CLEAR_GEOJSON');
export const CHANGE_MAP_MODE = Symbol('CHANGE_MAP_MODE');

export function addPolygon(polygon, id) {
	return {
		type: ADD_POLYGON,
		polygon,
		id
	}
}

export function focusPolygon(id) {
	return {
		type: FOCUS_POLYGON,
		id
	}
}

export function addPolygonGrid(id) {
	return {
		type: ADD_POLYGON_GRID,
		id
	}
}

export function mergePolygonGrid(gridCellIds) {
	return {
		type: MERGE_POLYGONS,
		ids: gridCellIds
	}
}

export function addGeoJson(geojson) {
	return {
		type: ADD_GEOJSON,
		payload: geojson
	}
}

export function clearGeoJson() {
	return {
		type: CLEAR_GEOJSON
	}
}

export function changeMapMode(mode) {
	return {
		type: CHANGE_MAP_MODE,
		mode
	}
}