/**
 * Creates a feature collection from the given features
 * @param {GeoJSON.Feature[]} features
 * @returns {GeoJSON.FeatureCollection}
 */
export function createCollection(features) {
	return {
		type: 'FeatureCollection',
		features
	}
}

/**
 * Converts an array of cell JSON objects to GeoJSON features
 * @param {Array<Object[]>} cells
 * @param {string} name
 * @returns {GeoJSON.Feature}
 */
export function convertCells(cells, name) {
	return cells.map((cell, index) => {
		return {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [cell.map(point => [point.x, point.y])]
			},
			properties: {
				isGrid: true
			}
		}
	});
}