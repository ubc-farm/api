import {createSelector} from 'reselect';
import {observeStore} from '../../ubc-farm-utils/index.js';
import watchActive from '../../ubc-farm-page-fields/map/connector.js';

import store from '../redux/store.js';
import map from './map.js';
import {isGridCell} from './filter.js';

// ---------------------------- //

watchActive(store);

// ---------------------------- //

const drawingModeSelector = createSelector(
	state => state.mapMeta.adding,
	isAddingMode => isAddingMode ? 'Polygon' : null
);

observeStore(
	store,
	drawingModeSelector,
	drawingMode => map.data.setDrawingMode(drawingMode)
);

// ---------------------------- //

function updateCells(newCells) {
	map.data.forEach(feature => {
		if (isGridCell(feature)) map.data.remove(feature);
	});

	return map.data.addGeoJson(newCells);
}
observeStore(store, state => state.cells,	updateCells);

// ---------------------------- //

const activeSelector = state => state.active;
const gridsSelector = createSelector(
	activeSelector,
	state => state.grids,
	(active, gridMap) => gridMap.get(active)
);
const gridDataSelector = createSelector(
	activeSelector,
	gridsSelector,
	(active, grid) => {active, grid}
);

function updateGridProperty({active, grid}) {
	const feature = map.data.getFeatureById(active);
	feature.setProperty('grid', grid);
}
observeStore(store, gridDataSelector, updateGridProperty);

// ---------------------------- //

observeStore(
	store,
	state => state.resizable,
	(newResizeable, lastResizable) => {
		const last = map.data.getFeatureById(newResizeable);
		const next = map.data.getFeatureById(lastResizable);

		if (last) last.removeProperty('resizable');
		if (next) next.setProperty('resizable', true);
	}
)