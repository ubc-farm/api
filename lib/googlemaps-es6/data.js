import enhance from './enhancer.js';

enhance(google.maps.Data);

google.maps.Data.prototype[Symbol.iterator] = function() {
	let results = [];
	this.forEach(feature => results.push(feature));
	return results[Symbol.iterator];
}

export default google.maps.Data;