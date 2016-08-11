import {createSelector} from 'reselect';
import {observeStore} from '../../ubc-farm-utils/index.js';
import watchActive from '../../ubc-farm-page-fields/map/connector.js';

import store from '../redux/store.js';
import {
	activeSelector, 
	resizableSelector,
	addModeSelector,
	cellSelector,
	activeGridSelector
} from '../redux/selectors.js';

import map from './map.js';
import {isGridCell} from './filter.js';

// ---------------------------- //

export const activeField = watchActive(store);

// ---------------------------- //

const drawingModeSelector = createSelector(
	addModeSelector,
	isAddingMode => isAddingMode ? 'Polygon' : null
);

export const drawingMode = observeStore(
	store, drawingModeSelector,
	drawingMode => map.data.setDrawingMode(drawingMode)
);

// ---------------------------- //

function updateCells(newCells) {
	map.data.forEach(feature => {
		if (isGridCell(feature)) map.data.remove(feature);
	});

	return map.data.addGeoJson(newCells);
}

export const overwriteCells = 
	observeStore(store, cellSelector,	updateCells);

// ---------------------------- //

const gridDataSelector = createSelector(
	activeSelector,
	activeGridSelector,
	(active, grid) => {active, grid}
);

export const updateGridProperty = observeStore(
	store, gridDataSelector,
	({active, grid}) => map.data.getFeatureById(active).setProperty('grid', grid)
);

// ---------------------------- //

export const resizeField = observeStore(
	store, resizableSelector,
	(newResizeable, lastResizable) => {
		const last = map.data.getFeatureById(newResizeable);
		const next = map.data.getFeatureById(lastResizable);

		if (last) last.removeProperty('resizable');
		if (next) next.setProperty('resizable', true);
	}
)