import {
	CLEAR_GRID_DATA, CHANGE_GRID_FIELD, SET_LOADING, SET_RESIZING
} from './actions.js'

export const defaultSubState = {
	loading: false,
	resizing: false,
	width: 2, height: 2,
	angle: 25,
	widthSpecific: [], heightSpecific: []
}

export default function gridForm(state = new Map(), action) {
	function setState(key = action.id, ...sources) {
		let clone = new Map(state);
		const subState = clone.get(key) || {};
		return clone.set(key, Object.assign({}, subState, ...sources));
	}

	switch (action.type) {
		case CLEAR_GRID_DATA: {
			let clone = new Map(state);
			clone.delete(action.id);
			return clone;
		}
		case CHANGE_GRID_FIELD: 
			return setState(action.id, { [action.field]: action.value });
		case SET_LOADING: 
			return setState(action.id, { loading: action.loading });
		case SET_RESIZING:
			return setState(action.meta, { resizing: action.payload });
		default: return state;
	}
}