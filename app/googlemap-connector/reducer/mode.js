import {CHANGE_MAP_MODE} from '../actions/base-actions.js'
import Mode from '../mode.js';

export default function mode(mode = '', action) {
	switch (action.type) {
		case CHANGE_MAP_MODE:
			if (action.payload !== Mode.RESIZE) return action.payload;
			//else fall through to default
		default: return mode;
	}
}