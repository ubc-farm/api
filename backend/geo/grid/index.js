const CoordinateSet = require('../latlng/set.js');
const {geom} = require('jsts');
const {computeHeading: getHeading} = require('../spherical.js');
const GridCell = require('./cell.js');

/**
 * A map with a default value
 */
class DefaultMap extends Map {
	constructor(base) {
		this.base = base;
		super();
	}
	
	/**
	 * If the index does not exist, return the default instead
	 */
	get(index) {
		let value = super.get(index);
		if (value === undefined) return base;
		else return value;
	}
}

module.exports = class Grid {
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
		
		this.cellPoints = new CoordinateSet();
	}
	
	setAlignment(line) {
		if (line == null) return;
		this.align = {
			point: line[0],
			base: getHeading(alignmentLine[0], alignmentLine[1])
		};
	}
	
	/**
	 * Using flood-fill algorithm, fill the container with grid squares
	 */
	fill() {
		let queue = [], cells = [];
		queue.push({pos: this.align.point, x: 0, y:0});
		
		while (queue.length !== 0) {
			let {nPos, nX, nY} = queue[0];
			queue.splice(0, 1);
			
			if (!this.cellPoints.has(nPos)) {
				let cell = new GridCell(nPos, width.get(nX), height.get(nY), 
					this.align.base);
				
				if (!cell.within(this.container)) {
					if (cell.intersects(this.container)) {
						cell.weaken(this.container);
					} else {
						continue;
					}
				}
				this.cellPoints.forceAdd(nPos);
				cells.push(cell);
				
				queue.push({pos: cell.west, x: nX - 1, y: nY});
				queue.push({pos: cell.east, x: nX + 1, y: nY});
				queue.push({pos: cell.north, x: nX, y: nY + 1});
				queue.push({pos: cell.south, x: nX, y: nY - 1});
			}
		}
		return cells;
	}
}