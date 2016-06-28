import combineReducers from 'reduce/combineReducers';
import mode from './mode.js';
import polygons from './polygons.js';
import focus from './focus.js';
import geojson from './geojson.js';

const mapApp = combineReducers({
	mode,
	polygons,
	geojson,
	focus
});

export default mapApp;