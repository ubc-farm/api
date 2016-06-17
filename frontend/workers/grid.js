import register from './promise/register.js';
import {convertPolygon} from '../geo/converter.js';
import Grid from '../geo/grid/index.js';
import jsts from 'jsts';

/**
 * @file Worker that generates a grid on a seperate thread
 * @module workers/grid.js
 */

/**
 * Build a field and return its grid
 * @param {Object} msg
 * @param {Coordinate[]} msg.path of field
 * @param {Object} msg.gridSpec
 * @param {number} msg.gridSpec.width - base width of grid
 * @param {number} msg.gridSpec.height - base height of grid
 * @param {number} msg.gridSpec.angle - angle of grid
 * @param {number[][]} msg.gridSpec.widthSpecific - specific widths
 * @param {number[]} msg.gridSpec.widthSpecific[] - key and width
 * @param {number[][]} msg.gridSpec.heightSpecific - specific heights
 * @param {number[]} msg.gridSpec.heightSpecific[] - key and height
 * @return {Promise<Array<Object[]>>} array of cell arrays, where each point is 
 * an object with x and y.
 */
register(function(msg) {
	let polygon = convertPolygon(msg.path);
	let grid = new Grid(msg.gridSpec.width, msg.gridSpec.height, 		
		msg.gridSpec.angle, polygon);
	
	for (let [key, width] of msg.gridSpec.widthSpecific) {
		field.grid.width.set(key, width);
	}
	
	for (let [key, width] of msg.gridSpec.heightSpecific) {
		field.grid.height.set(key, width);
	}
	
	return grid.fill().map(cell => {
		return cell.getCoordinates().map(coord => {
			return {x: coord.x, y: coord.y};
		});
	});
})