/**
 * Editing functionality using Field
 * @requires google.maps.drawing
 * @module map/field-edit.js
 */

import google from 'google-maps-drawing';
import {Field, polygonOptions} from 'map/field.js';
console.log(Field);

const drawManagerOptions = {
	drawingControl: false,
	polygonOptions: polygonOptions
}

var manager, add, select;
var polygons = [];

/**
 * Class that wraps around a DrawingManger with helper
 * functions for the fields/edit page
 */
export default class FieldEditor {
	constructor() {
		manager = new google.maps.drawing.DrawingManager(drawManagerOptions);
		console.log(manager);
		google.maps.event.addListener(manager, 
			'polygoncomplete', FieldEditor.polygonComplete);
	}
	
	/** Get the DrawingManger tied to this editor */
	get DrawingManger() {return manager}
	
	/** Set the DrawingManager's assigned map */
	set map(map) { manager.setMap(map) }
	
	 
	/**
	 * Set the "Add field" button
	 * @param {Element} button
	 */
	set addButton(button) {
		add = button;
		add.addEventListener('click', FieldEditor.addMode);
	}
	
	/**
	 * Set the "Select" button
	 * @param {Element} button
	 */
	set selectButton(button) {
		select = button;
		select.addEventListener('click', FieldEditor.selectMode);
	}
	
	/**
	 * Set the Editng div
	 * @param {Element} pane
	 */
	set editPane(pane) {
		
	}
	
	/**
	 * Called to switch to add mode on the map
	 * @listens click
	 */
	static addMode() {
		select.classList.remove('hover-toggle');
		add.classList.add('hover-toggle');
		manager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	}
	
	/**
	 * Called to switch to select mode
	 * @listens click
	 */
	static selectMode() {
		add.classList.remove('hover-toggle');
		select.classList.add('hover-toggle');
		manager.setDrawingMode(null);
	}
	
	/**
	 * Sets up polygons for resizing
	 */
	static resizeMode() {
		polygons.map(poly => {poly.setEditable(true)})
	}
	
	/**
	 * Delete polygons from the map and polygons array
	 */
	deletePolygon(polygon) {
		
	}
	
	/**
	 * Responds to a new polygon drawing creating a field
	 * from the polygon and editing it
	 * @listens polygoncomplete
	 * @this google.maps.DrawingManager
	 */
	static polygonComplete(polygon) {
		let field = new Field();
		field.polygon = polygon;
		FieldEditor.edgeOverlay(field);
		
		polygons.push(polygon);
		google.maps.event.addListener(polygon, 'click', function(e) {
			console.log(this.Field)
		})
		FieldEditor.selectMode();
	}
	
	/**
	 * Opens polygon for editing when clicked
	 * @listens click
	 * @this google.maps.Polygon
	 */
	static polygonClick() {
		FieldEditor.selectMode();
	}
	
	/**
	 * Create clickable, hoverable edges on the polygon
	 * @param {Field} polygon to draw over
	 * @returns {google.maps.Polyline[]} lines drawn over the polygon
	 */
	static edgeOverlay(field) {
		let lines = field.toLines(true);
		let map = field.polygon.getMap();
		
		const polylineOptions = {
			geodesic: true,
			strokeColor: 'rgb(214, 83, 76)',
			strokeOpacity: 0.0,
			strokeWeight: 6,
			zIndex: 10,
			map: map
		}
		
		function showLine(event) {
			this.setOptions({strokeOpacity: 1.0});
			event.stop();
		}
		
		function hideLine(event) {
			this.setOptions({strokeOpacity: 0.0});
			event.stop();
		}
		
		return field.toLines(true).map(line => {
			polylineOptions.path = line;
			let polyline = new google.maps.Polyline(polylineOptions);
			console.log(polyline);
			google.maps.event.addListener(polyline, 'mouseover', showLine);
			google.maps.event.addListener(polyline, 'mouseout', hideLine);
			return polyline;
		})
	}
	
	/**
	 * Update the field's lengths or base when the polygon is edited
	 * @listens insert_at
	 * @listens remove_at
	 * @listens set_at
	 * @this google.maps.Polygon
	 * @param {number} id - index where node was changed
	 * @param {*} [element] - element that was removed/previously here
	 */
	static changePolygonAt() {
		
	}
	
	/**
	 * Called to update the grid on the map
	 * @param {string} editAction (base/width/height)
	 */
	updateGrid(editAction) {
		//TODO: Redraw grid
	}
	
	/** Change the base ID of the grid, then update the map */
	set grid_base(base) {
		//this.grid_base = base;
		updateGrid('base');
	}
	
	set grid_widths(widths) {
		//super.grid_widths = widths;
		updateGrid('width');
	}
	set grid_heights(heights) {
		//super.grid_heights = heights;
		updateGrid('height');
	}
}