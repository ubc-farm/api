export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const UPDATE_GEOJSON = 'UPDATE_GEOJSON';

export const CLEAR_GRID_DATA = 'CLEAR_GRID_DATA';
export const CHANGE_GRID_FIELD = 'CHANGE_GRID_FIELD';
export const SET_LOADING = 'SET_LOADING';

export function changeActive(newId) {
	return {type: CHANGE_ACTIVE, newId}
}
export function updateGeoJson(id, payload, error) {
	return {type: UPDATE_GEOJSON, payload, error, meta: {id}}
}

export function clearSubData(forId) {
	return {type: CLEAR_GRID_DATA, id: forId};
}

export function changeField(id, field, newValue) {
	if (
		['width', 'height', 'angle', 'widthSpecific', 'heightSpecific']
		.includes(field)
	) {
		return {type: CHANGE_GRID_FIELD, id, field, value: newValue}
	} else
		return {};
}

export function setLoading(id, loadingState) {
	return {type: SET_LOADING, id, loading: loadingState}
}