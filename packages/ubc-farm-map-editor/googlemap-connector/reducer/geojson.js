import {
	ADD_GEOJSON, CLEAR_GEOJSON, REMOVE_GEOJSON
} from '../actions/base-actions.js'

export default function geojson(keyList = {}, action) {
	switch (action.type) {
		case ADD_GEOJSON:
			return Object.assign({}, keyList, {
				[action.timestamp]: action.geojson
			});
		
		case REMOVE_GEOJSON:
			delete keyList[action.timestamp];
			return Object.assign({}, keyList);

		case CLEAR_GEOJSON:
			return {};
		
		default: return keyList;
	}
}