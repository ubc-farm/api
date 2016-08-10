/* global google */
import {createElement} from 'react'; /** @jsx createElement */
import {render} from 'react-dom';

import WeatherDisplay from '../weather/display.js';
import map from './map.js'

export default google.maps.event.addListener(map, 'center_changed', () => {
	render(<WeatherDisplay position={map.getCenter().toJSON()} />);
});