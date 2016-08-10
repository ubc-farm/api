import {OVERWRITE_CELLS} from './actions.js'

const defaultState = {
	parent: undefined,
	cells: {
		type: 'FeatureCollection',
		features: []
	}
}

export default function cells(state = defaultState, action) {
	if (action.type === OVERWRITE_CELLS) {
		const {meta: parent, payload: cells = defaultState.cells, error} = action;

		if (error) {
			console.error(error);
			return state;
		} else {
			return Object.assign({}, state, { parent, cells });
		}
	} else {
		return state;
	}
}