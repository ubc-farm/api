import {ADD_POLYGON} from './actions.js';

export function addPolygon(polygonList = new Map(), action) {
	switch (action.type) {
		case ADD_POLYGON:
			let clone = new Map(polygonList);
			return clone.set(id, action.polygon);
		default: return polygonList;
	}
}