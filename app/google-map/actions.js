import Polygon from 'lib/geojson/polygon';

export const ADD_FIELD = Symbol('ADD_FIELD');
export const FOCUS_FIELD = Symbol('FOCUS_FIELD');

export function addField(polygon, id) {
	if (!polygon instanceof Polygon)
		polygon = Polygon.fromGoogle(polygon);
	return {
		type: ADD_FIELD,
		polygon,
		id
	}
}

export function focusField(id) {
	return { type: FOCUS_FIELD, id }
}