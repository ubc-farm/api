import {id as randomID} from '../../ubc-farm-utils/index.js';

import {setSelected, addingMode} from '../redux/actions.js';
import buildGrid from '../redux/action-build-grid.js';
import store from '../redux/store.js';

import map from './map.js';
import {isField, isNewlyDrawn} from './filter.js';
import {toGeoJson} from './promisify.js';
import defaultGrid from './grid-default.js';

/**
 * Listener for click event
 */
export function handlePolygonClick({feature}) {
	if (isField(feature)) {
		const id = feature.getId();
		store.dispatch(setSelected(id));
	}
}

/**
 * Listener for addfeature event
 */
export function handlePolygonAdd({feature}) {
	if (isNewlyDrawn(feature)) {
		store.dispatch(addingMode(false));

		const id = randomID();
		toGeoJson(feature).then(f => {
			f.id = id;
			f.properties.parent = null;
			f.properties.grid = defaultGrid;

			map.data.remove(feature);
			map.data.addGeoJson(f);

			store.dispatch(setSelected(id));
			store.dispatch(buildGrid(id));
		});
	}
}