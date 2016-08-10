import PromiseWorker from 'promise-worker';

import map from '../map/map.js';
import {toGeoJson} from '../map/promisify.js';

import {
	changeActive, changeFieldFormData,
	updateGeoJson
} from './actions.js';

const GridWorker = 
	new PromiseWorker('/packages/ubc-farm-page-map-editor/worker.js');

export default function buildGrid(polyID, gridOptions) {
	return (dispatch, getState) => {
		if (!polyID) polyID = getState().active;

		if (gridOptions) dispatch(changeFieldFormData(polyID, gridOptions));
		gridOptions = getState().gridForm.get(polyID);

		const polygon = map.data.getFeatureById(polyID);

		return toGeoJson(polygon)
		.then(feature => GridWorker.postMessage({feature, gridOptions}))
		.then(features => {
			dispatch(updateGeoJson(polyID, features));
			dispatch(changeActive(polyID));
		})
		.catch(err => dispatch(updateGeoJson(polyID, undefined, err)));
	}
}