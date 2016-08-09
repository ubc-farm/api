/* global google */
import store from '../redux/store.js';
import {setSelected} from '../redux/actions.js';

import map from './map.js';
import {field} from './style.js';

google.maps.event.addListener(map.data, 'click', 
	feature => store.dispatch(setSelected(feature.id)))

map.data.setStyle(field.normal);

let lastActive = '';
store.subscribe(() => {
	const {active} = store.getState();
	if (active === lastActive) return;

	const last = map.data.getFeatureById(lastActive);
	const next = map.data.getFeatureById(active);

	if (last) last.setOptions(field.normal);
	if (next) next.setOptions(field.selected);

	lastActive = active;
})