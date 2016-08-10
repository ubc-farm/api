import map from './map.js';
import {isGridCell} from './filter.js';

/**
 * Adds functionality to 'select' polygons when mousing over them
 * while the mouse button is down. 
 * @module frontend/map/shapes/select
 */
class Selector {
	/**
	 * @param {google.maps.Map} map
	 * @param {function} filter - passed the feature, returns true if this is a feature that should be able to be selected
	 */
	constructor(map) {
		this.active = false; this.ctrlKey = false; 
		this.map = map;

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleRightMouseDown = this.handleRightMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);

		window.addEventListener('mousedown', this.handleRightMouseDown);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	handleRightMouseDown(e) {
		if (e.button !== 2) return;
		this.active = true; this.ctrlKey = e.ctrlKey;
		this.mouseOverListener = 
			this.map.data.addListener('mouseover', this.handleMouseOver)
	}

	handleMouseUp(e) {
		if (e.button !== 2) return;
		this.active = false; 
		if (this.mouseOverListener) this.mouseOverListener.remove();
	}

	/** Destroy all event handlers */
	flush() {
		this.active = false;
		window.removeEventListener('mousedown', this.handleRightMouseDown);
		window.removeEventListener('mouseup', this.handleMouseUp);
		this.mouseOverListener.remove();
	}

	/** Event handler for when the mouse goes over a tile */
	handleMouseOver({feature}) {
		if (this.active && isGridCell(feature)) {
			const selected = feature.getProperty('selected');
			if (this.ctrlKey && selected) 
				feature.setProperty('selected', false);
			else if (!this.ctrlKey && !selected) 
				feature.setProperty('selected', true);
		}
	}

	/**
	 * Get an array of selected cells
	 * @returns {google.maps.Data.Polygon[]}
	 */
	selected(map = this.map) {
		let cells = [];
		map.data.forEach(cell => {
			if (cell.getProperty('selected')) 
				cells.push(cell);
		});
		return cells;
	}

	/** Interator protocolor function */
	[Symbol.iterator]() { return this.selected()[Symbol.iterator]; }
}

new Selector(map);