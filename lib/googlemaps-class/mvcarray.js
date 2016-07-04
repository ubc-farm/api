import dic from './dictionary';
import wrap from './wrap.js';

export default class MVCArray extends wrap(google.maps.MVCArray, [], dic) {
	*keys() {
		const length = this.length;
		for (let i = 0; i < length; i++) yield i;
	}

	*values() {
		const length = this.length;
		for (let i = 0; i < length; i++) yield this.getAt(i);
	}

	*entries() {
		const length = this.length;
		for (let i = 0; i < length; i++) yield [i, this.getAt(i)];
	}

	toString() {
		return [...this].join(',');
	}

	[Symbol.iterator]() {
		return this.values();
	}

	[Symbol.toPrimitive](hint) {
		if (hint == 'number') return NaN;
		else return this.toString();
	}

	toJSON() {
		return [...this];
	}
}