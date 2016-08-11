/* global google */
import {observeStore} from '../../ubc-farm-utils/index.js';
import {setSelected} from '../redux/actions.js';

import map from './map.js';
import {field} from './style.js';

const selectedStyle = Object.assign({}, field.normal, field.selected);
map.data.setStyle(feature => {
	if (feature.getProperty('activeField')) return selectedStyle;
	else return field.normal;
});

function updateActive(newActive, lastActive) {
	const last = map.data.getFeatureById(lastActive);
	const next = map.data.getFeatureById(newActive);

	if (last) last.removeProperty('activeField');
	if (next) next.setProperty('activeField', true);
}

export default function connectToStore(store) {
	const listener = google.maps.event.addListener(map.data, 'click', 
		({feature}) => store.dispatch(setSelected(feature.getId())))
	
	const unsubscribe = observeStore(store, state => state.active, updateActive);

	return {
		unsubscribe,
		remove: listener.remove
	};
}