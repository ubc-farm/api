import Field from 'map/field.js';

function Field() {}

/**
 * Opens the edit panel for this field
 */
Field.prototype.edit = function() {
	
}

/**
 * Send field data to a worker to save it
 */
Field.prototype.save = function() {
	
}

/**
 * Change the base ID of the grid
 * @param {number} base 
 */
Field.prototype.editGridBase = function(base) {
	
}

/**
 * Change the widths/heights specified
 * @param {Object[]} size
 * @param {boolean} size[].isWidth - true for width, false for height
 * @param {number} size[].newLength
 */
Field.prototype.editGridLength = function(lengths) {
	
}

/**
 * Responds to a new polygon drawing creating a field
 * from the polygon and editing it
 * @listens polygonComplete
 * @this google.maps.DrawingManager
 */
Field.onComplete = function(polygon) {
	var f = new Field(polygon);
	f.edit();
}

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
Field.onClick = function() {
	this.fieldObj.edit();
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
Field.clickEdge = function(e) {
	if (e.edge) {
		this.fieldObj.editGrid({base: e.edge});
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
Field.editAt = function(id, element) {
	
}

/**
 * Updated once map is loaded 
 * @type google.maps.DrawManager
 */
var drawManager = {
	drawingControl: false,
	polygonOptions: Field.polygonOptions
}

/*
# Polygon events:
- polygonComplete (DrawingManager) - when someone finishes drawing a polygon
- insert_at (Polygon.Path) - node inserted
- remove_at (Polygon.Path) - node removed
- set_at (Polygon.Path) - node moved

mouse events contain the edge, path, and vertex clicked
*/

loadMap.promise.then(function() {
	drawManager = new google.maps.drawing.DrawingManager(drawManager);
})