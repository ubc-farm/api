import {FOCUS_POLYGON} from '../actions/base-actions.js'

export default function focus(focusId = undefined, action) {
	switch (action.type) {
		case FOCUS_POLYGON:
			return action.payload.id
		default: return focusId;
	}
}