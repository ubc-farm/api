import CellSet from 'geo/grid/set.js';
import jsts from 'jsts';
import {computeHeading as getHeading} from 'geo/spherical.js';
import GridCell from 'geo/grid/cell.js';
const {geom} = jsts;

/**
 * A map with a default value
 */
class DefaultMap extends Map {
	constructor(base) {
		super();
		this.base = base;
	}
	
	/**
	 * If the index does not exist, return the default instead
	 */
	get(index) {
		let value = super.get(index);
		if (value === undefined) return this.base;
		else return value;
	}
}

export default class Grid {
	/**
	 * @param {number} baseWidth
	 * @param {number} baseHeight
	 * @param {number} [angle] - angle of the grid
	 * @param {Coordinate} corner - corner to start grid generation from
	 * @param {Polygon} container - containing polygon
	 */
	constructor(baseWidth = 1.0, baseHeight = 1.0, angle = 0, corner, container) {
		this.angle = angle;
		this.corner = corner;
		this.container = container;
		
		this.width = new DefaultMap(baseWidth);
		this.height = new DefaultMap(baseHeight);
	}
	
	/**
	 * Using flood-fill algorithm, fill the container with grid squares
	 * @returns {Polygon[]} array of grid cells
	 */
	fill() {
		console.log(jsts);
		let queue = [];
		queue.push({pos: this.corner, x: 0, y:0});
		
		let cells = new CellSet();
		let weakCells = new CellSet();
		
		while (queue.length !== 0) {
			//if (cells.size > 100) break;
			let {pos:nPos, x:nX, y:nY} = queue.shift();
			let cell = new GridCell(nPos, this.width.get(nX), this.height.get(nY), 
					this.angle);
			
			if (!cells.has(cell)) {
				
				//TODO: fix within detection
				if (!cell.within(this.container)) {
					if (cell.intersects(this.container)) {
						cell.weaken(this.container);
						weakCells.add(cell.weak);
					} else {
						continue;
					}
				} 
				cells.forceAdd(cell);	
				
				queue.push({pos: cell.west, x: nX - 1, y: nY});
				queue.push({pos: cell.east, x: nX + 1, y: nY});
				queue.push({pos: cell.north, x: nX, y: nY + 1});
				queue.push({pos: cell.south, x: nX, y: nY - 1});
			}
		}
		return Array.from(cells).filter(cell => cell.weak === null)
			.concat(Array.from(weakCells));
	}
	
	/**
	 * Unite all the cells given into a single polygon
	 */
	static union(...cells) {
		cells.reduce((previous, current) => {
			return current.union(previous);
		}, {
			//this object pretends its an empty geometry
			isEmpty: function() {return true}
		});
	}
}