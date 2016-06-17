export default class FeatureCollection {
	get type() {return 'FeatureCollection'}
	constructor(features) {
		this.features = features;
	}

	toJSON() {
		let {type, features} = this;
		return {type, features}
	}
} 