import {
	focusPolygonByIds,
	editPolygonById
} from './base-actions.js';

export function focusPolygon(id) {
	return (dispatch, getState) => {
		const oldID = getState().focus;
		dispatch(focusPolygonByIds(oldID, id));
	}
}

export function editPolygon(editable) {
	return (dispatch, getState) => {
		const id = getState().focus;
		dispatch(editPolygonById(id, editable));
	}
}