export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const UPDATE_GEOJSON = 'UPDATE_GEOJSON';
export const ADD_MODE = 'ADD_MODE';

export const CLEAR_GRID_DATA = 'CLEAR_GRID_DATA';
export const CHANGE_GRID_FIELD = 'CHANGE_GRID_FIELD';
export const SET_LOADING = 'SET_LOADING';
export const SET_RESIZING = 'SET_RESIZING';

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

export function setResizing(id, resizingState) {
	return {type: SET_RESIZING, meta: id, payload: resizingState}
}
export function toggleResize() {
	return (dispatch, getState) => {
		const {active, gridForm} = getState();
		const {resizing} = gridForm.get(active) || {};
		return dispatch(setResizing(active, !resizing));
	}
}

export function setAdding(addingState) {
	return {type: ADD_MODE, payload: addingState}
}
export function toggleAdding() {
	return (dispatch, getState) => {
		const {adding} = getState().mapMeta;
		dispatch(setAdding(!adding));
	}
}