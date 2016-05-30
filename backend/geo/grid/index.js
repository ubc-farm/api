const LatLng = require('../latlng/');
const LatLngSet = require('../latlng/set.js');
const {geo: geometry} = require('d3');

module.exports = class Grid {
	constructor(alignmentLine) {
		this.align = {
			point: alignmentLine[0],
			base: 0//heading from 0 to 1 of alignmentLine
		}
	}
	
	
}