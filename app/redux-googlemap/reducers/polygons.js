import {ADD_POLYGON, REMOVE_POLYGON} from '../base-actions.js';

export default function polygons(polygonState = {}, action) {
	switch (action.type) {
		
		case ADD_POLYGON:
			return Object.assign({}, keyedList, {
				[action.id]: {
					polygon: action.polygon,
					gridId: '',
					gridSpec: {}
				}
			});
		
		case REMOVE_POLYGON:
			delete keyedList[action.id];
			return keyedList;

		default: return keyedList;
	}
}