import {CHANGE_MAP_MODE, Mode} from '../base-actions.js';

export default function mode(mode = '', action) {
	switch (action.type) {
		case CHANGE_MAP_MODE:
			return action.payload;
		default: return mode;
	}
}