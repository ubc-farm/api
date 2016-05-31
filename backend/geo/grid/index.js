const CoordinateSet = require('../latlng/set.js');
const {geom} = require('jsts');

module.exports = class Grid {
	constructor(alignmentLine, container) {
		this.align = {
			point: alignmentLine[0],
			base: 0//heading from 0 to 1 of alignmentLine
		}
		this.container = container;
		this.envelope = container.getEnvelopeInternal();
		//this.envelope.expandByDistances(0, 0); expand by max width/height
		
		this.cellPoints = new CoordinateSet(undefined, false);
		this.cells = [];
	}
	
	fill() {
		let queue = [];
		queue.push(this.align.point);
		while (queue.length !== 0) {
			
		}
	}
}