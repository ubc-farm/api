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