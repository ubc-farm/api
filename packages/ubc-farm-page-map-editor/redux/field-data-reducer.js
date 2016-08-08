import {
	UPDATE_GEOJSON
} from './actions.js'

export default function fieldData(state = {}, action) {
	switch (action.type) {
		case UPDATE_GEOJSON: return action.payload || state;
		default: return state;
	}
}