import dic from './dictionary';
import enhance from './enhancer.js';

enhance(google.maps.MVCArray, false, dic);

google.maps.MVCArray.prototype.keys = *function() {
	for (let i = 0; i < this.length; i++) yield i;
}

google.maps.MVCArray.prototype.values = *function() {
	for (let i = 0; i < this.length; i++) yield this.getAt(i);
}

google.maps.MVCArray.prototype.entries = *function() {
	for (let i = 0; i < this.length; i++) yield [i, this.getAt(i)];
}

google.maps.MVCArray.prototype[Symbol.iterator] = () => this.values();

google.maps.MVCArray.prototype.toJSON = () => [...this];

google.maps.MVCArray.prototype.toString = () => this.toJSON().join(',');

google.maps.MVCArray.prototype[Symbol.toPrivitive] = function(hint) {
	if (hint == 'number') return NaN;
	else return this.toString();
}