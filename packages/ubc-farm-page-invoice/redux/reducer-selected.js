import columnList from '../columnlist.js';
import {
	TOGGLE_SELECTION, 
	CLEAR_SELECTION, 
	EVERYTHING_SELECTION
} from './actions.js';

export default function selected(state = new Set(), action, dataState) {
	switch (action.type) {
		case TOGGLE_SELECTION: {
			const id = action.payload;
			let selected = new Set(state);
			
			if (selected.has(id)) 
				selected.delete(id);
			else 
				selected.add(id);

			return selected;
		}
		case CLEAR_SELECTION: {
			return new Set();
		}
		case EVERYTHING_SELECTION: {
			return new Set(dataState.keys());
		}

		default: return state;
	}
}