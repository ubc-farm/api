/** @enum */
const mode = {
	ADD: 'add',
	SELECT: 'select',
	RESIZE: 'resize'
}

export class PolygonEditor {
	constructor(Map) {
		this.worker = new ModuleWorker('lib/autogrid/worker');
	}

	mode(newMode) {
		if (this._mode === newMode) return;
		else if (newMode === mode.ADD) {
			// let user draw on map
			this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON 
				|| 'polygon');
		} else if (newMode === mode.SELECT) {
			// let user click on map
			this.drawManager.setDrawingMode(null);
		} else if (newMode === mode.RESIZE) {
			// make polygon resizable
		}
	}

	focus(polygon, newSettings) {

	}

	merge(cells) {

	}
}