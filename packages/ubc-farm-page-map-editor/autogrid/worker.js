import {register} from 'promise-worker';
import {io, operation} from '../../jsts/index.es.js';

import {
	Feature, FeatureCollection
} from '../../ubc-farm-utils/class/geojson/index.js';

import AutoGrid from './autogrid.js';
import factory from './factory.js';

const {GeoJSONReader} = io;
const {union: {CascadedPolygonUnion}} = operation;

/**
 * GeoJSONWriter seems to be broken; just extract the parser and run that
 * instead. GeoJSONWriter.write just runs parser.write anyways.
 * @type {jsts.io.GeoJSONParser}
 */
const reader = new GeoJSONReader(factory);
const {parser: writer} = reader;

/** 
 * Unites all the given polygons into a large polygon
 * @param {Object} msg
 * @param {GeoJSON.Polygon[]} msg.cells - array of cells
 * @returns {GeoJSON.Polygon} the resulting polygon
 */
function mergeCells(cells) {
	cells = cells.map(c => reader.read(c));
	const result = CascadedPolygonUnion.union(cells);
	return writer.write(result);
}

/**
 * Build a field and return its grid
 * @param {GeoJSON.Feature} feature for field
 * @param {Object} feature.id - id of the field, set as cell parent
 * @param {Object} msg.grid
 * @param {number} msg.gridOptions.width - base width of grid
 * @param {number} msg.gridOptions.height - base height of grid
 * @param {number} msg.gridOptions.angle - angle of grid
 * @param {number[][]} msg.gridOptions.widthSpecific - specific widths
 * @param {number[]} msg.gridOptions.widthSpecific[] - key and width
 * @param {number[][]} msg.gridOptions.heightSpecific - specific heights
 * @param {number[]} msg.gridOptions.heightSpecific[] - key and height
 * @return {FeatureCollection} array of cell polygons
 */
function buildGrid(feature) {
	const field = feature.id;
	const polygon = reader.read(feature.geometry);

	let features = [];
	for (const cell of AutoGrid(polygon, feature.properties.grid)) {
		if (cell.getGeometryType() !== 'Polygon') continue;

		const geometry = writer.write(cell);
		const properties = {
			isGridCell: true,
			parent: field
		}
		const feature = new Feature(geometry, properties);

		features.push(feature);
	}

	return new FeatureCollection(features);
}

register(msg => {
	if ('feature' in msg) return buildGrid(msg.feature);
	else if ('cells' in msg) return mergeCells(msg.cells);
});