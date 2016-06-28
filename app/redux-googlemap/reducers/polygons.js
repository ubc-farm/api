import {ADD_POLYGON, FOCUS_POLYGON} from './base-actions.js';

export default function polygons(keyedList = {}, action) {
	switch (action.type) {
		
		case ADD_POLYGON:
			return Object.assign({}, keyedList, {
				[action.id]: {
					polygon: action.polygon,
					focused: false,
					gridId: ''
				}
			});
		
		case FOCUS_POLYGON:
			const {id} = action;
			return Object.assign({}, keyedList, {
				[id]: Object.assign({}, keyedList[id], {
					focused: true
				})
			});

		default: return keyedList;
	}
}