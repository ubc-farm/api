import enhance from './enhancer.js';

enhance(google.maps.MVCArray);

google.maps.MVCArray.prototype.entries = function*() {
	for (let i = 0; i < this.length; i++) yield [i, this.getAt(i)];
}

google.maps.MVCArray.prototype.keys = function*() {
	for (let [index, ] of this.entries()) yield index;
}

google.maps.MVCArray.prototype.values = function*() {
	for (let [, value] of this.entries()) yield value;
}

google.maps.MVCArray.prototype[Symbol.iterator] = () => this.values();

google.maps.MVCArray.prototype.toJSON = () => [...this];

google.maps.MVCArray.prototype.toString = () => this.toJSON().join(',');

google.maps.MVCArray.prototype[Symbol.toPrivitive] = function(hint) {
	if (hint == 'number') return NaN;
	else return this.toString();
}

export default google.maps.MVCArray;