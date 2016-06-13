/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap} from 'map/config.js';
import * as style from 'map/shapes/style.js';
import {setActive as setActiveGrid} from 'map/editor-grid-render.js';
import Selector from 'map/shapes/select.js';
import MapSidebar from './sidebar.jsx';

import google from 'google/maps/drawing';
import React, {createElement} from 'react';
import ReactDOM, {render} from 'react-dom';

function swapMode(newMode) {
	let drawMode = null;
	if (newMode === 'add') drawMode = google.maps.drawing.OverlayType.POLYGON;
	manager.setDrawingMode(drawMode)
}

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
function polygonClick() {
	
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
	aside.setMode('select')
	
	setActiveGrid(polygon); //@todo custom grid options
}

var polygons = [];
var aside;
var manager = new google.maps.drawing.DrawingManager({
	drawingControl: false,
	polygonOptions: style.field.normal
});

var aside = domReady.then(() => {
	return ReactDOM.render(<MapSidebar onModeChange={swapMode}/>,
		document.getElementById('map-edit-aside'));
})

var map = domReady.then(() => initMap())
.then(map => { 
	google.maps.event.addListener(manager, 'polygoncomplete', polygonComplete);
	manager.setMap(map);
	return map; });

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