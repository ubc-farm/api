import google from 'google/maps/drawing';

/**
 * Creates a Data Feature from the provided grid cells
 * @param {LatLngLiteral[][]} cells
 * @param {LatLngLinteral[]} cells[] - the path of a cell's polygon 
 * @param {string} [name]
 * @returns {Data.FeatureOptions}
 */
export function displayGrid(cells, name) {
	let options = {
		geometry: new google.maps.Data.MultiPolygon(cells),
		properties: {isGrid: true}
	}
	if (name != null) {
		options.id = name + '-field';
	}
	return options;
}

/**
 * Converts an array of cell JSON objects to Google Maps data polygons
 * @param {Array<Object[]>} cells
 * @returns {google.maps.Data.Polygon}
 */
export function convertCells(cells) {
	return cells.map(cell => {
		return new google.maps.Data.Polygon([
			cell.map(point => new google.maps.LatLng(point.y, point.x))
		])
	});
}