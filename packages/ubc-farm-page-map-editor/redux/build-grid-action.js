import PromiseWorker from 'promise-worker';
import {Polygon} from '../../ubc-farm-utils/class/geojson/index.js';
import polygonRef from '../map/polygons.js';
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

		const polygon = Polygon.fromGoogle(polygonRef.get(polyID));

		GridWorker.postMessage({polygon, gridOptions})
		.then(features => {
			dispatch(changeActive(polyID));
			dispatch(updateGeoJson(polyID, features));
		})
		.catch(err => dispatch(updateGeoJson(polyID, undefined, err)));
	}
}