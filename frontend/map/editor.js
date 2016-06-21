/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap} from 'map/config.js';
import * as style from 'map/shapes/style.js';
import {
	setActive as setActiveGrid, 
	styler, 
	mergeGrid
} from 'map/editor-grid-render.js';
import Selector from 'map/shapes/select.js';
import MapSidebar from './sidebar.js';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import google from 'google/maps/drawing';

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
function polygonClick() {
	react.then(aside => {aside.setPolygon(this)});
}

/**
 * Responds to a new polygon drawing creating a field
 * from the polygon and editing it
 * @listens polygoncomplete
 * @this google.maps.DrawingManager
 */
function polygonComplete(polygon) {
	polygons.push(polygon);
	google.maps.event.addListener(polygon, 'click', polygonClick)
	react.then(aside => {aside.setPolygon(polygon)});
}

/**
 * Updates the grid using the provided data
 * @listens MapSidebar#submit
 */
function updateGrid({angle, width, height, polygon}) {
	return setActiveGrid(polygon, {angle, width, height})
}

/**
 * Switches the drawing mode on the map
 * @param {string} newMode - either 'add' or 'select'
 */
function swapMode(newMode) {
	if (newMode === 'resize') {

	} else {
		let drawMode = null;
		if (newMode === 'add') drawMode = google.maps.drawing.OverlayType.POLYGON;
		manager.setDrawingMode(drawMode);
	}
}

function merge() {select.then(selector => mergeGrid(selector))}

var polygons = [];
var manager = new google.maps.drawing.DrawingManager({
	drawingControl: false,
	polygonOptions: style.field.normal
});

var react = domReady.then(() => {
	return ReactDOM.render(
		<MapSidebar onModeChange={swapMode} updateGrid={updateGrid}
		            createGrid={merge}/>,
		document.getElementById('map-edit-aside')
	);
})

var map = domReady.then(() => initMap()).then(map => { 
	google.maps.event.addListener(manager, 'polygoncomplete', polygonComplete);
	manager.setMap(map);
	return map; 
});

var select = map.then(map => {
	map.data.setStyle(styler);
	return new Selector(map);
});