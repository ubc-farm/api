import {
	ADD_POLYGON, REMOVE_POLYGON,
	FOCUS_POLYGON, EDIT_POLYGON
} from '../actions/base-actions.js'

const initialPolygonState = {
	gridId: '',
	gridSpec: {
		width: 2, height: 2,
		angle: 25,
		widthSpecific: [], heightSpecific: []
	},
	editable: false,
	style: 'normal'
};

function initPolygon(polygon) {
	return Object.assign({}, initialPolygonState, {
		polygon
	})
}

function modify(map, key, modification) {
	return map.set(
		key, 
		Object.assign({}, map.get(key), 
			modification)
	);
}

export default function polygons(polygonState = new Map(), action) {
	const {type, payload} = action;
	let newMap;
	switch (type) {
		case ADD_POLYGON:
			newMap = new Map(polygonState);
			return newMap.set(payload.id, initPolygon(payload.polygon));
		
		case REMOVE_POLYGON:
			newMap = new Map(polygonState);
			newMap.delete(payload);
			return newMap;

		case FOCUS_POLYGON: 
			newMap = new Map(polygonState);
			modify(newMap, payload.id, { style: 'selected'	});
			modify(newMap, payload.oldId, { style: 'normal' });
			return newMap;

		case EDIT_POLYGON: 	
			newMap = new Map(polygonState);
			return modify(newMap, payload.id, {	editable: payload.editable });

		default: return polygonState;
	}
}