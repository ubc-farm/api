import {FOCUS_POLYGON} from '../base-actions.js'

export default function focus(focused = '', action) {
	switch (action.type) {
		case FOCUS_POLYGON:
			return action.id;
		default: return focused;
	}
}