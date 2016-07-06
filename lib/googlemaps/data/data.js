import enhance from './enhancer.js';
import {promisifyMethod} from './helpers.js';

enhance(google.maps.Data);

google.maps.Data.prototype.values = function*() {
	let results = [];
	this.forEach(feature => results.push(feature));
	return results[Symbol.iterator]();	
}

google.maps.Data.prototype.keys = function*() {
	for (let value of this.values()) yield value.id;
}

google.maps.Data.prototype.entries = function*() {
	for (let value of this.values()) yield [value.id, value];
}

google.maps.Data.prototype[Symbol.iterator] = function() {
	return this.values();
}

google.maps.Data.prototype.loadGeoJsonAsync = promisifyMethod('loadGeoJson');
google.maps.Data.prototype.toGeoJsonAsync = promisifyMethod('toGeoJson');

export default google.maps.Data;