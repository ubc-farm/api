import {register} from '../promise-worker';
import AutoGrid from './autogrid.js';
import GridMerge from './merge.js';
import jsts from 'jsts';

const factory = new jsts.geom.GeometryFactory();
/**
 * GeoJSONWriter seems to be broken; just extract the parser and run that
 * instead. GeoJSONWriter.write just runs parser.write anyways.
 * @type {jsts.io.GeoJSONParser}
 */
const reader = new jsts.io.GeoJSONReader(factory);
const {parser: writer} = reader;

/** 
 * Unites all the given polygons into a large polygon
 * @param {Object} msg
 * @param {GeoJSON.Polygon[]} msg.cells - array of cells
 * @returns {GeoJSON.Polygon} the resulting polygon
 */
register(msg => {if (msg.cells) {
	const coroutine = GridMerge(factory);
	coroutine.next();
	for (let cell of cells) coroutine.next(reader.read(cell));
	return writer.write(coroutine.return().value);
}})

/**
 * Build a field and return its grid
 * @param {Object} msg
 * @param {GeoJSON.Polygon} msg.polygon for field
 * @param {Object} msg.gridSpec
 * @param {number} msg.gridSpec.width - base width of grid
 * @param {number} msg.gridSpec.height - base height of grid
 * @param {number} msg.gridSpec.angle - angle of grid
 * @param {number[][]} msg.gridSpec.widthSpecific - specific widths
 * @param {number[]} msg.gridSpec.widthSpecific[] - key and width
 * @param {number[][]} msg.gridSpec.heightSpecific - specific heights
 * @param {number[]} msg.gridSpec.heightSpecific[] - key and height
 * @return {GeoJSON.Polygon[]} array of cell polygons
 */
register(msg => {if (msg.gridSpec) {
	const polygon = reader.read(msg.polygon);
	const {angle} = msg.gridSpec;
		
	return [...AutoGrid(polygon, msg.gridSpec, angle)].reduce((array, cell) => {
		if (cell.getGeometryType() == 'Polygon') array.push(writer.write(cell));
		return array;
	})	
}})