export default class FeatureCollection {
	get type() {return 'FeatureCollection'}
	constructor(features) {
		this.features = features;
	}

	toJSON() {
		const {type, features} = this;
		return {type, features}
	}
} 