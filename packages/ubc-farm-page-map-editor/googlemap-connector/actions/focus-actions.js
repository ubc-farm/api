import {
	focusPolygonByIds,
	editPolygonById
} from './base-actions.js';

export function focusPolygon(id) {
	return (dispatch, getState) => {
		const oldID = getState().map.focus;
		dispatch(focusPolygonByIds(oldID, id));
	}
}

export function editPolygon(editable) {
	return (dispatch, getState) => {
		const id = getState().map.focus;
		dispatch(editPolygonById(id, editable));
	}
}