import google from 'google/maps/drawing';

/**
 * @param {LatLngLiteral[][]} cells
 * @param {LatLngLinteral[]} cells[] - the path of a cell's polygon 
 * @param {string} [name]
 * @returns {Data.FeatureOptions}
 */
export function displayGrid(cells, name) {
	let options = {
		geometry: new google.maps.Data.MultiPolygon(cells)
	}
	if (name != null) {
		options.id = name + '-field';
	}
	return options;
}

/**
 * @param {LatLngLinteral[]} polygon path
 * @param {string} [name]
 * @returns {Data.FeatureOptions}
 */
export function displayEdges(polygon, name) {
	let edges = polygon.reduce((previous, current) => {
		return [previous[1], current];
	}, [0, polygon[polygon.length - 1]]);

	return edges.map((edge, index) => {
		let options = {
			geometry: new google.maps.Data.LineString(edge),
			properties: {show: false}
		};
		if (name != null) {
			options.id = `${name}-edge-${index}`;
		}
		return options;
	})	
}