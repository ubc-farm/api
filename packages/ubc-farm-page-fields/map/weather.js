/* global google */
import {createElement} from 'react'; /** @jsx createElement */
import {render} from 'react-dom';

import WeatherDisplay from '../weather/display.js';
import map from './map.js'
import {map as mapOptions} from './style.js';

const target = document.getElementById('weather-mount');

export function renderWeather(position = mapOptions.center) {
	render(
		<WeatherDisplay {...position} delay={5000} />,
		target
	);
}

export const listener = google.maps.event.addListener(map, 'center_changed', 
	() => { renderWeather(map.getCenter().toJSON()); });

renderWeather();