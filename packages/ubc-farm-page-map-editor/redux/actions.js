export const OVERWRITE_CELLS = 'OVERWRITE_CELLS';

export const ADD_MODE = 'ADD_MODE';
export const SET_RESIZING = 'SET_RESIZING';

export const SET_LOADING = 'SET_LOADING';
export const APPLY_GRID_DATA = 'APPLY_GRID_DATA';


export {
	SET_SELECTED, 
	setSelected
} from '../../ubc-farm-page-fields/redux/actions.js';

/** Used to load a new grid onto the map, for the given parent field */
export function overwriteCells(parent, payload, error) {
	return {type: OVERWRITE_CELLS, payload, error, meta: parent}
}

/** Set the grid property for a field */
export function applyGridData(toField, grid) {
	return {type: APPLY_GRID_DATA, payload: grid, meta: toField}
}



/** Set the field to be resized. Call with no args to clear. */
export function resizeField(id = '') {
	return {type: SET_RESIZING, payload: id}
}

/** If true, the user can draw on the map. */
export function addingMode(state) {
	return {type: ADD_MODE, payload: state}
}



/** Toggles resizing for the selected polygon */
export function toggleResizing() {
	return (dispatch, getState) => {
		const {active, resizing} = getState();
		if (resizing === active) 
			return dispatch(resizeField());
		else 
			return dispatch(resizeField(active));
	}
}

/** Toggles adding mode */
export function toggleAdding() {
	return (dispatch, getState) => {
		const addModeActive = getState().mapMeta.adding;
		dispatch(addingMode(!addModeActive));
	}
}