/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap as start, hi} from 'map/config.js';
import google from 'google-maps-drawing';

import {default as Field} from 'map/editor.js';

let drawingManger = 
	new google.maps.drawing.DrawingManager(Field.drawManagerOptions());

domReady.then(start).then(map => {
	drawingManger.setMap(map);
})