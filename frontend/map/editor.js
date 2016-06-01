/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap as start} from 'map/config.js';
import iconButton from 'elements/icon-button.js'
import google from 'google/maps/drawing';
import {displayGrid, displayEdges} from 'map/shapes/draw.js';
import ModuleWorker from 'workers/promise/system.js'

/**
 * Called to switch to add mode on the map
 * @listens click
 */
function addMode() {
	buttons.select.classList.remove('hover-toggle');
	buttons.add.classList.add('hover-toggle');
	manager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
}

/**
 * Called to switch to select mode
 * @listens click
 */
function selectMode() {
	add.classList.remove('hover-toggle');
	select.classList.add('hover-toggle');
	manager.setDrawingMode(null);
}

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
function polygonClick() {
	
}

function buildGrid(path, gridSpec) {
	gridWorker.postMessage({
		name: null,
		path, gridSpec
	}).then(cells => {
		displayGrid(cells, null);
	})
	//Web worker then
	//displayGrid(cells, name)
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
	selectMode();
	buildGrid(polygon.getPath().getArray().map(point => {
		let {lng: x, lat: y} = point.toJSON();
		return {x, y};
	}), {
		width: 1, height: 1,
		widthSpecific: [], heightSpecific: []
	});
}


var buttons = {};
var manager = new google.maps.drawing.DrawingManager({
	drawingControl: false
});
var gridWorker = new ModuleWorker('/js/worker/grid.js');

//var editor = new FieldEditor();

domReady.then(() => {
	let sidebar = document.getElementById('map-edit-aside');
	
	let frag = document.createDocumentFragment();
	let add = iconButton('add', 'Add Field');
	let select = iconButton('edit', 'Select');
	
	frag.appendChild(add); 
	frag.appendChild(select); 
	sidebar.insertBefore(frag, sidebar.firstChild);
	
	add.addEventListener('click', addMode);
	select.addEventListener('click', selectMode);
	buttons = {add, select};
	
	return start();
}).then(map => { 
	map.setTilt(0);
	google.maps.event.addListener(manager, 'polygoncomplete', polygonComplete);
	manager.setMap(map); 
});