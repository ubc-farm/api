import {grid as style} from 'map/shapes/style.js';

/**
 * Adds functionality to 'select' polygons when mousing over them
 * while the mouse button is down. 
 */
export default class Selector {
	/**
	 * @param {google.maps.Map} map
	 * @param {function} filter - passed the feature, returns true if this is a feature that should be able to be selected
	 */
	constructor(map, filter = ()=>true, onMouseRelease = ()=>{}) {
		this.selected = [];
		this.map = map;
		this.active = false;
		this.onMouseRelease = onMouseRelease;

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);

		this.mousedown = window.addEventListener('mousedown', this.onMouseDown);
		this.mouseup = window.addEventListener('mouseup', this.onMouseUp);
		
		this.filter = filter;
	}

	onMouseDown(e) {
		if (e.button !== 2) return;
		this.active = true;
		this.overListener = this.map.data.addListener('mouseover', this.onMouseOver)
	}

	onMouseUp(e) {
		if (e.button !== 2) return;
		this.active = false;
		if (this.overListener) this.overListener.remove();
		if (this.active <= 0) {
			this.onMouseRelease(this.selected);
		}
	}

	/**
	 * @todo functionality for Ctrl-Clicks
	 */
	set onCtrl(value) {
		this.ctrlCallback = value;
	}

	/** Clear the selected array */
	clear() {
		this.selected = [];
	}

	/** Destroy all event handlers */
	flush() {
		this.clear();
		this.active = false;
		this.mousedown.remove();
		this.mouseup.remove();
		this.overListener.remove();
	}

	/** Event handler for when the mouse goes over a grid tile */
	onMouseOver(e) {
		let feature = e.feature;
		if (this.active && this.filter(feature) 
		&& !feature.getProperty('selected')) 
		{
			feature.setProperty('selected', true);
			this.map.data.overrideStyle(feature, style.selected)
		}
	}
	
	/** @todo functionality for Ctrl-Clicks */
	onClick(e) {

	}
}