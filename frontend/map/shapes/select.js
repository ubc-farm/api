import google from 'google/maps/drawing';

/**
 * Adds functionality to 'select' grid tiles when mousing over them
 * while the mouse button is down. 
 */
export default class GridSelector {
	constructor(map) {
		this.selected = [];
		this.active = 0; //using number in case multiple buttons are pressed at once
		this.mousedown = google.maps.event.addListener(map, 'mousedown', e => {
			this.active++;
			this.overListener = map.data.addListener('mouseover', this.onMouseOver);
		})
		this.mouseup = google.maps.event.addListener(map, 'mouseup', e => {
			this.active--;
			this.overListener.remove();
			if (this.active <= 0) {
				this.releaseCallback(this.selected);
			}
		})
	}
	/** Callback for when the mouse button is released */
	set onRelease(value) {
		this.releaseCallback = value;
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
		this.active = 0;
		this.mousedown.remove();
		this.mouseup.remove();
		this.overListener.remove();
	}

	/** Event handler for when the mouse goes over a grid tile */
	onMouseOver(e) {
		let feature = e.feature;
		if (!feature.getProperty('selected') && this.active > 0) {
			feature.setProperty('selected', true);
		}
	}
	
	/** @todo functionality for Ctrl-Clicks */
	onClick(e) {

	}
}