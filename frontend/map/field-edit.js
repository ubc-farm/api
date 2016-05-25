/**
 * Editing functionality using Field
 * @requires google.maps.drawing
 * @see module:map/field.js
 * @module map/field-edit.js
 */

import Field from 'map/field.js';
import {docReady} from 'utils.js';

export default class extends Field {
	constructor(DrawingManager) {
		this.drawManager = DrawingManager;
	}
	
	/**
	 * Called to switch to edit mode on the map
	 */
	add() {
		this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	}
	
	/**
	 * Called to open the edit panel for this field
	 * @callback this.edit
	 * @memberof this
	 * @param {string} editAction (new/click/edge)
	 */
	edit(editAction) {
		//Overwrite me!
		console.warn('No edit callback specified', this, editAction);
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
		this.grid_base = base;
		updateGrid('base');
	}
	
	set grid_widths(widths) {
		super.grid_widths = widths;
		updateGrid('width');
	}
	set grid_heights(heights) {
		super.grid_heights = heights;
		updateGrid('height');
	}
	
	/**
	 * Responds to a new polygon drawing creating a field
	 * from the polygon and editing it
	 * @listens polygonComplete
	 * @this google.maps.DrawingManager
	 */
	static polygonComplete(polygon) {
		let f = new Field();
		f.polygon = polygon;
		this.drawManager.setDrawingMode(null);
		f.edit();
	}
	
	/**
	 * Opens polygon for editing when clicked
	 * @listens click
	 * @this google.maps.Polygon
	 */
	static polygonClick() {
		this.Field.edit();
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
		if (e.edge) {
			this.drawManager.setDrawingMode(null);
			this.Field.grid_base = e.edge;
		}
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
	
	static drawManagerOptions() {
		return {
			drawingControl: false,
			polygonOptions: Field.polygonOptions()
		}
	}
}