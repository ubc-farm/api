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
		this.active = false; this.ctrlKey = false;
		Object.assign(this, {map, filter, onMouseRelease})

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);

		window.addEventListener('mousedown', this.onMouseDown);
		window.addEventListener('mouseup', this.onMouseUp);
	}

	onMouseDown(e) {
		if (e.button !== 2) return;
		this.active = true; this.ctrlKey = e.ctrlKey;
		this.overListener = this.map.data.addListener('mouseover', this.onMouseOver)
	}

	onMouseUp(e) {
		if (e.button !== 2) return;
		this.active = false; 
		if (this.overListener) this.overListener.remove();
		if (this.active <= 0) {
			this.onMouseRelease();
		}
	}

	/** Destroy all event handlers */
	flush() {
		this.active = false;
		window.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('mouseup', this.onMouseUp);
		this.overListener.remove();
	}

	/** Event handler for when the mouse goes over a tile */
	onMouseOver(e) {
		let feature = e.feature;
		if (this.active && this.filter(feature)) {
			let selected = feature.getProperty('selected');
			if (this.ctrlKey && selected) {
				feature.setProperty('selected', false);
			}	else if (!this.ctrlKey && !selected) {
				feature.setProperty('selected', true);
			}
		}
	}
}