/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap as start} from 'map/config.js';
import iconButton from 'elements/icon-button-old.js'
import google from 'google/maps/drawing';
import * as style from 'map/shapes/style.js';
import {displayGrid} from 'map/shapes/draw.js';
import ModuleWorker from 'workers/promise/system.js';

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
	buttons.add.classList.remove('hover-toggle');
	buttons.select.classList.add('hover-toggle');
	manager.setDrawingMode(null);
} 

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
function polygonClick() {
	
}

/**
 * Sends grid data off to a web worker then
 * resolves with a new grid data feature for the map
 * @param {Coordinate[]} path - path of containing polygon
 * @param {Object} gridSpec
 * @see module:workers/grid.js
 * @returns {Promise<Data.FeatureOptions>} grid as a feature
 */
function buildGrid(path, gridSpec) {
	return gridWorker.postMessage({
		name: null,
		path, gridSpec
	}).then(cells => {
		return cells.map(cell => {
			return new google.maps.Data.Polygon([
				cell.map(point => new google.maps.LatLng(point.y, point.x))
			])
		})
	}).then(cells => {
		return displayGrid(cells, null);
	})
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
	
	let path = polygon.getPath().getArray().map(point => {
		let {lng: x, lat: y} = point.toJSON();
		return {x, y};
	});
	path.push(path[0]);
	
	Promise.all([
		buildGrid(path, {
			width: 2, height: 2,
			angle: 25,
			widthSpecific: [], heightSpecific: []
		}),
		map
	]).then(results => {
		let [grid, map] = results;
		console.log(grid);
		map.data.add(grid);
	})
}

var polygons = [];
var buttons = {};
var manager = new google.maps.drawing.DrawingManager({
	drawingControl: false,
	polygonOptions: style.field.normal
});
var gridWorker = new ModuleWorker('workers/grid.js');

//var editor = new FieldEditor();

var map = domReady.then(() => {
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
	map.data.setStyle(feature => {
		if (feature.getProperty('isGrid')) {
			return style.grid.normal;
		}
	})
	return map;
});