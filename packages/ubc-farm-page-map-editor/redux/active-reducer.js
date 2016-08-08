import {
	CHANGE_ACTIVE
} from './actions.js'

export default function activeField(state = '', action) {
	switch (action.type) {
		case CHANGE_ACTIVE:
			return action.newId;
		default: return state;
	}
}