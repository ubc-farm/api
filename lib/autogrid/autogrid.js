import PolygonSet from './polyset.js';
import AutoGridCell from './autocell.js';
import DefaultMap from './defaultmap.js';

/**
 * Using flood-fill algorithm, fill the container with grid rectangles.
 * @param {jsts.geom.Polygon} container - polygon to fill with grid
 * @param {Object} [baseDimensions]
 * @param {number} [baseDimensions.width] - width of each cell
 * @param {number} [baseDimensions.height] - height of each cell
 * @param {number} [angle] of the grid
 * @returns {Generator}
 * @yields {jsts.geom.Polygon} grid cell
 * @throws if container isn't a jsts geometry
 */
export default function* AutoGrid(container, baseDimensions, angle = 0.0) {
	if (!container.getGeometryType) 
		throw TypeError('AutoGrid container must be a JSTS geometry');
	const width = new DefaultMap(
		baseDimensions.width || 1.0, 
		baseDimensions.widthSpecific
	);
	const height = new DefaultMap(
		baseDimensions.height || 1.0, 
		baseDimensions.heightSpecific
	);

	let cells = new PolygonSet(), queue = [];
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