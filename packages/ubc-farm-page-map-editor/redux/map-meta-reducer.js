import {ADD_MODE} from './actions.js';

const defaultState = {
	adding: false
}

export default function mapMeta(state = defaultState, action) {
	const setState = (...source) => Object.assign({}, state, ...source);
	switch (action.type) {
		
		case ADD_MODE: return setState({ adding: action.payload });

		default: return state;
	}
}