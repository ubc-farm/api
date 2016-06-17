import register from './promise/register.js';
import Grid from '../geo/grid/index.js';
import jsts from 'jsts';
import Polygon from 'geo/geojson/polygon.js';

/**
 * @file Worker that generates a grid on a seperate thread
 * @module frontend/workers/grid
 */

const factory = new jsts.geom.GeometryFactory();
const reader = new jsts.io.GeoJSONReader(factory);
const writer = reader.parser; //GeoJSONWriter seems to be broken;
// just extact the parser and run that instead.
// GeoJSONWriter.write just runs parser.write anyways

/**
 * Build a field and return its grid
 * @param {Object} msg
 * @param {GeoJSON.Polygon} msg.path of field
 * @param {Object} msg.gridSpec
 * @param {number} msg.gridSpec.width - base width of grid
 * @param {number} msg.gridSpec.height - base height of grid
 * @param {number} msg.gridSpec.angle - angle of grid
 * @param {number[][]} msg.gridSpec.widthSpecific - specific widths
 * @param {number[]} msg.gridSpec.widthSpecific[] - key and width
 * @param {number[][]} msg.gridSpec.heightSpecific - specific heights
 * @param {number[]} msg.gridSpec.heightSpecific[] - key and height
 * @return {Promise<GeoJSON.Polygon[]>} array of cell polygons
 */
register(function(msg) {
	let path = reader.read(msg.path);

	let {width, height, angle} = msg.gridSpec;
	let grid = new Grid(width, height, angle, path);
	grid.width.insert(msg.gridSpec.widthSpecific);
	grid.height.insert(msg.gridSpec.heightSpecific);
	
	return grid.fill().reduce((array, cell) => {
		if (cell.getGeometryType() == 'Polygon') 
			array.push(writer.write(cell));
		return array;
	}, []);
})