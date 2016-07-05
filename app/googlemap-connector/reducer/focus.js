import {FOCUS_POLYGON, CHANGE_MAP_MODE} from '../actions/base-actions.js'
import Mode from '../mode.js';

export default function focus(focusId = undefined, action) {
	switch (action.type) {
		case FOCUS_POLYGON:
			return action.payload.id
		default: return focusId;
	}
}