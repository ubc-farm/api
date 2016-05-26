/**
 * Editing functionality using Field
 * @requires google.maps.drawing
 * @module map/field-edit.js
 */

import google from 'google-maps-drawing';
import {polygonOptions} from 'map/field.js';

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
		polygons.push(polygon);
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
	 * Sets the new base with the edge that was clicked on.
	 * Intended to only listen when the user specifies they want
	 * to edit the base.
	 * @listens click
	 * @this google.maps.Polygon
	 * @param {google.maps.PolyMouseEvent} e
	 * @param {number} e.edge - id of the clicked edge
	 */
	static edgeClick() {
		
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