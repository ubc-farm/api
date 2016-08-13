export {default} from './autogrid.js';

function toGeoJson(geomPolygon) {
	return {
		type: 'Polygon',
		coordinates: [geomPolygon.getCoordinates().map(({x, y}) => [x, y])]
	};
}