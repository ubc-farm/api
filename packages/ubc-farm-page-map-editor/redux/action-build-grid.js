import PromiseWorker from 'promise-worker';

import map from '../map/map.js';
import {toGeoJson} from '../map/promisify.js';

import {
	setSelected, setDataLoading,
	applyGridData, overwriteCells
} from './actions.js';

const GridWorker = 
	new PromiseWorker('/packages/ubc-farm-page-map-editor/autogrid/worker.js');

export default function buildGrid(polyID, gridOptions) {
	return (dispatch, getState) => {
		polyID = polyID || getState().active;
		if (gridOptions) dispatch(applyGridData(polyID, gridOptions));
		gridOptions = getState().grids.get(polyID);

		dispatch(setDataLoading(polyID, true));
		const polygon = map.data.getFeatureById(polyID);

		return toGeoJson(polygon)
		.then(feature => GridWorker.postMessage({feature, gridOptions}))
		.then(features => {
			dispatch(overwriteCells(polyID, features));
			dispatch(setDataLoading(polyID, false))
			dispatch(setSelected(polyID));
		})
		.catch(err => dispatch(overwriteCells(polyID, undefined, err)));
	}
}