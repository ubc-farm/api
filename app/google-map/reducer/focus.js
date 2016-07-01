import {FOCUS_POLYGON} from '../actions/base-actions.js'
import Mode from '../mode.js';

export default function focus(focusDetails = {}, action) {
	switch (action.type) {
		case FOCUS_POLYGON:
			return Object.assign({}, focusDetails, {
				polygon: action.id,
				resizing: false
			})
		case CHANGE_MAP_MODE:
			if (action.payload === Mode.RESIZE) {
				return Object.assign({}, focusDetails, {
					resizing: true
				})
			} //else flow to default
		default: return focused;
	}
}