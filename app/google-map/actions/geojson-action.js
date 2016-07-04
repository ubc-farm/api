import {
	addGeoJsonWithoutCheck,
	removeGeoJson
} from './base-actions.js';
import {Feature, FeatureCollection} from 'lib/geojson';
import ModuleWorker from 'lib/module-worker';

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

const gridWorker = new ModuleWorker('lib/autogrid/worker');
export function buildGrid(id, timestamp) {
	return (dispatch, getState) => {
		const {polygon, gridSpec} = getState().polygons[id];
		return gridWorker
			.postMessage({polygon, gridSpec})
			.then(cells => new FeatureCollection(
				cells.map(c => new Feature(c, {isGrid: true}))
			)).then(grid => {
				dispatch(addGeoJson(grid, timestamp));
			});
	}
}