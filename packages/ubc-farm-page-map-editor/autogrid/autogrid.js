import PolygonSet from './polyset.js';
import AutoGridCell from './autocell.js';
import DefaultMap from './defaultmap.js';

/**
 * Using flood-fill algorithm, fill the container with grid rectangles.
 * @param {jsts.geom.Polygon} container - polygon to fill with grid
 * @param {Object} [gridOptions]
 * @param {number} [gridOptions.baseWidth] - width of each cell
 * @param {number} [gridOptions.baseHeight] - height of each cell
 * @param {number} [gridOptions.angle] of the grid
 * @returns {Generator}
 * @yields {jsts.geom.Polygon} grid cell
 * @throws if container isn't a jsts geometry
 */
export default function* AutoGrid(container, gridOptions) {
	if (!container.getGeometryType) 
		throw TypeError('AutoGrid container must be a JSTS geometry');
	const width = new DefaultMap(
		gridOptions.baseWidth || 2.0, 
		gridOptions.specificWidths
	);
	const height = new DefaultMap(
		gridOptions.baseHeight || 2.0, 
		gridOptions.specificHeights
	);
	const {angle} = gridOptions;

	const cells = new PolygonSet(), queue = [];
	queue.push({pos: container.getCoordinate(), row: 0, col: 0});
	AutoGridCell.init(container.getFactory());

	try { while (queue.length > 0) {
		const {pos, row, col} = queue.shift();
		const cell = new AutoGridCell(pos, width.get(row), height.get(col), angle);

		if (!cells.has(cell)) {
			if (cell.within(container)) yield cell;
			else if (cell.intersects(container)) yield cell.weaken(container);
			else continue;
			cells.forceAdd(cell);

			queue.push({pos: cell.west, row: row -1, col});
			queue.push({pos: cell.east, row: row +1, col});
			queue.push({pos: cell.north, row, col: col +1});
			queue.push({pos: cell.south, row, col: col -1});
		}
	}} finally { 
		cells.clear();
	}
}