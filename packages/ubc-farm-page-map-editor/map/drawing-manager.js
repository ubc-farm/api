/* global google */
import map from './map.js';
import {field} from './style.js';

export default new google.maps.drawing.DrawingManager({
	map,
	drawingControl: false,
	polygonOptions: field.normal
});