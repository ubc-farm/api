import dic from './dictionary';
import wrap from './wrap.js';

export default class Data extends wrap(google.maps.Data, false, dic) {
	features() {
		let featureList = [];
		this.forEach(feature => featureList.push(feature));
		return featureList;
	}

	includes(feature) {return this.contains(feature)}
	
	[Symbol.iterator]() {
		return this.features();
	}
}