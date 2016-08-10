/* global google */
import map from './map.js';
import {isGridCell} from './filter.js';

/**
 * Adds functionality to 'select' polygons when mousing over them
 * while the mouse button is down. 
 */

var rightMouseDown = false, modifierKeyDown = false;

/**
 * Handle mouseover event
 * @param {Data.MouseEvent} e
 * @param {Data.Feature} e.feature
 */
function handleMouseOver({feature}) {
	if (rightMouseDown && isGridCell(feature)) {
		const featureSelected = feature.getProperty('selected');
		if (modifierKeyDown && featureSelected) {
			feature.setProperty('selected', false);
		}	else if (!modifierKeyDown && !featureSelected) {
			feature.setProperty('selected', true);
		}
	}
}

/** @type {google.maps.MapsEventListener|undefined} */
var mouseOverListener;
/** Creates a mouse over listener if needed. */
function createMouseOverListener() {
	if (mouseOverListener !== undefined) return mouseOverListener;
	else return mouseOverListener = google.maps.event.addListener(
		map.data, 'mouseover',
		handleMouseOver
	);
}
/** Destroys the mouse over listener if it exists */
function destroyMouseOverListener() {
	if (mouseOverListener) {
		mouseOverListener.remove();
		//mouseOverListener = undefined;
	}
}

/**
 * Responds to a mousedown event by tracking the right button
 * and activating the mouseOverListener.
 * @param {MouseEvent} e
 * @param {number} e.button
 * @param {boolean} e.ctrlKey
 */
function handleRightMouseDown({button, ctrlKey}) {
	if (button === 2) {
		rightMouseDown = true;
		modifierKeyDown = ctrlKey;

		createMouseOverListener();
	}
}

/**
 * Responds to a mouseup event by tracking the right button
 * and removing the mouseOverListener.
 * @param {MouseEvent} e
 * @param {number} e.button
 */
function handleRightMouseUp({button}) {
	if (button === 2) {
		rightMouseDown = false;
		destroyMouseOverListener();
	}
}

/** Removes all event listeners */
export function flush() {
	destroyMouseOverListener();
	window.removeEventListener('mousedown', handleRightMouseDown);
	window.removeEventListener('mouseup', handleRightMouseUp);
	rightMouseDown = false;
}

/** Creates event listeners */
export function init() {
	rightMouseDown = false; modifierKeyDown = false;

	window.addEventListener('mousedown', handleRightMouseDown);
	window.addEventListener('mouseup', handleRightMouseUp);
}
init();

/**
 * Finds all selected cells, and returns them as an array.
 * Also returns the cell's parent ID as a property on the array.
 * @returns {Array<google.maps.Data.Polygon>} cells
 */
export default function getSelectedCells(map = map) {
	let cells = [];
	let parents = new Map();

	map.data.forEach(cell => {
		if (cell.getProperty('selected')) {
			cells.push(cell);

			const cellParent = cell.getProperty('parent');
			parents.set(cellParent, parents.get(cellParent) + 1);
		}
	});

	let mostCommonParent, greatestCount = 0;
	for (const [parent, count] of parents) {
		if (count > greatestCount) {
			greatestCount = count;
			mostCommonParent = parent;
		}
	}

	cells.parent = mostCommonParent;
	return cells;
}