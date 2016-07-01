import {
	addGeoJsonWithoutCheck,
	removeGeoJson
} from './base-actions.js';

export function addGeoJson(geojson, timestamp) {
	return (dispatch, getState) => {
		const keys = Object.keys(getState().geojson).sort((a, b) => b - a);
		if (keys.length > 1) {
			for (let i = 1; i < keys.length; i++) {
				dispatch( removeGeoJson(keys[i]) );
			}
		}

		dispatch(addGeoJsonWithoutCheck(geojson, timestamp));
	}
}