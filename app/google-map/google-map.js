import * as style from './style.js';

export default class DiffableGoogleMap {
	constructor(div, options = style.map) {
		this.super = new google.maps.Map(div, options);
	}

	getState() {
		const {markers, polygons, lines, features} = this;
		return {
			markers,
			polygons,
			lines,
			features
		}
	}

	static diff(previousState, newState) {
		
	}
}