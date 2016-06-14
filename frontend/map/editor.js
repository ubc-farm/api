/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap} from 'map/config.js';
import * as style from 'map/shapes/style.js';
import {setActive as setActiveGrid} from 'map/editor-grid-render.js';
import Selector from 'map/shapes/select.js';
import MapSidebar from './sidebar.js';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import google from 'google/maps/drawing';

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 * @todo
 */
function polygonClick() {
	setActiveGrid(this);
}

/**
 * Responds to a new polygon drawing creating a field
 * from the polygon and editing it
 * @listens polygoncomplete
 * @this google.maps.DrawingManager
 */
function polygonComplete(polygon) {
	polygons.push(polygon);
	google.maps.event.addListener(polygon, 'click', e => {})
	react.then(aside => {aside.setMode('select')});
	
	setActiveGrid(polygon); //@todo custom grid options
}

/**
 * Switches the drawing mode on the map
 * @param {string} newMode - either 'add' or 'select'
 */
function swapMode(newMode) {
	let drawMode = null;
	if (newMode === 'add') drawMode = google.maps.drawing.OverlayType.POLYGON;
	manager.setDrawingMode(drawMode)
}

var polygons = [];
var manager = new google.maps.drawing.DrawingManager({
	drawingControl: false,
	polygonOptions: style.field.normal
});

var react = domReady.then(() => {
	let aside = ReactDOM.render(
		<MapSidebar onModeChange={swapMode}/>,
		document.getElementById('map-edit-aside')
	);
	return aside;
})

var map = domReady.then(() => initMap()).then(map => { 
	google.maps.event.addListener(manager, 'polygoncomplete', polygonComplete);
	manager.setMap(map);
	return map; 
});

map.then(map => {
	new Selector(map);
	map.data.setStyle(feature => {
		if (feature.getProperty('isGrid')) {
			if (feature.getProperty('selected')) {
				return style.grid.selected;
			} else return style.grid.normal;
		}
	})
	return map;
});