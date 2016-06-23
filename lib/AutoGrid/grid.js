import CellSet from './set.js';
import {geom} from 'jsts';
import {computeHeading as getHeading} from '../spherical.js';
import GridCell from './cell.js';


/**
 * @module shared/geo/grid
 */
export default class Grid {
	/**
	 * @param {number} baseWidth
	 * @param {number} baseHeight
	 * @param {number} [angle] - angle of the grid
	 * @param {geom.Polygon} container - containing polygon
	 */
	constructor(baseWidth = 1.0, baseHeight = 1.0, angle = 0, container) {
		this.angle = angle;
		this.container = container;
		
		this.width = new DefaultMap(baseWidth);
		this.height = new DefaultMap(baseHeight);
	}
	
	/**
	 * Using flood-fill algorithm, fill the container with grid squares
	 * @returns {Polygon[]} array of grid cells
	 */
	fill() {
		return [...this.generate()];
	}
	
	/**
	 * Using flood-fill algorithm, fill the container with grid squares
	 * @returns {Generator}
	 * @yields {Polygon} grid cell
	 */
	* generate() {
		const container = this.container;

		let cells = new CellSet();
		let weakCells = new CellSet();
		let queue = [];
		queue.push({pos: container.getCoordinate(), x: 0, y:0});
		
		while (queue.length > 0) {
			//if (cells.size > 100) break;
			const {pos:nPos, x:nX, y:nY} = queue.shift();
			const cell = new GridCell(
				nPos, 
				this.width.get(nX), 
				this.height.get(nY), 
				this.angle
			);
			
			if (!cells.has(cell)) {
				
				let result;
				if (!cell.within(container)) {
					if (cell.intersects(container)) {
						cell.weaken(container);
						weakCells.add(cell.weak);
						cells.forceAdd(cell);	
						result = cell.weak;
					} else {
						continue;
					}
				} else {
					cells.forceAdd(cell);	
					result = cell;
				}
				
				queue.push({pos: cell.west, x: nX - 1, y: nY});
				queue.push({pos: cell.east, x: nX + 1, y: nY});
				queue.push({pos: cell.north, x: nX, y: nY + 1});
				queue.push({pos: cell.south, x: nX, y: nY - 1});
				
				yield result;
			}
		}
	}
}