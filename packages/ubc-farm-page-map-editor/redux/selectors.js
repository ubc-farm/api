import {createSelector} from 'reselect';

export const activeSelector = state => state.active;
export const resizableSelector = state => state.resizable;
export const addModeSelector = state => state.mapMeta.adding;
export const loadingSelector = state => state.loading;

export const cellSelector = state => state.cells.data;

export const activeGridSelector = createSelector(
	activeSelector,
	state => state.grids,
	(active, gridMap) => gridMap.get(active)
);

export const currentLoadingSelector = createSelector(
	activeSelector,
	loadingSelector,
	(active, loading) => loading.has(active)
)