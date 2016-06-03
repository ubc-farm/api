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
	 * @param {Coordinate[]} alignmentLine - a line for the base, pointing right
	 * @param {Coordinate} alignmentLine[0] - start point for grid generation
	 * @param {Coordinate} alignmentLine[1] - end point for baseline
	 * @param {Polygon} container
	 * @param {number} baseWidth
	 * @param {number} baseHeight
	 */
	constructor(baseWidth = 1.0, baseHeight = 1.0, alignmentLine, container) {
		this.setAlignment(alignmentLine);
		this.container = container;
		
		this.width = new DefaultMap(baseWidth);
		this.height = new DefaultMap(baseHeight);
	}
	
	setAlignment(line) {
		if (line == null) return;
		this.align = {
			point: line[0],
			base: getHeading(line[0], line[1])
		};
	}
	
	/**
	 * Using flood-fill algorithm, fill the container with grid squares
	 */
	fill() {
		console.log(jsts);
		let queue = [];
		queue.push({pos: this.align.point, x: 0, y:0});
		
		let cells = new CellSet();
		let weakCells = new CellSet();
		
		while (queue.length !== 0) {
			//if (cells.size > 100) break;
			let {pos:nPos, x:nX, y:nY} = queue.shift();
			let cell = new GridCell(nPos, this.width.get(nX), this.height.get(nY), 
					this.align.base);
			
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