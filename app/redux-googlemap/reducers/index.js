import combineReducers from 'reduce/combineReducers';
import mode from './mode.js';
import polygons from './polygons.js';
import geojson from './geojson.js';

const mapApp = combineReducers({
	mode,
	polygons,
	geojson
});

export default mapApp;