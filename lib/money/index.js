/**
 * Class used to represent money. 
 * Internally represents its value as an integer, to avoid float math issues
 * @extends Number
 */
export default class Money extends Number {
	/**
	 * @param {number|number[]} money - if an array, 
	 * uses money[0] as dollars and money[1] as cents
	 * @param {Object} [options]
	 * @param {boolean} [options.convert] - if true, parse the money integer as
	 * cents instead of dollars.
	 * @param {number} [options.exactness] - lets you use cent values smaller than
	 * $0.01. 
	 */
	constructor(money, options = {}) {
		const {convert = false, exactness = 0} = options;

		let dollars, cents = 0;
		if (convert) {
			super(money);
			return;
		} 
		else if (Array.isArray(dollars)) [dollars, cents] = money;
		else if (!Number.isInteger(dollars)) {
			dollars = Math.trunc(money);
			cents = (money - dollars) * 100;
		} 

		const tenPow = Math.pow(10, exactness);
		cents = Math.trunc(tenPow * cents) / tenPow;

		super((dollars * 100) + cents);
	}

	/** @type {number} */
	get dollars() {
		return Math.trunc(this / 100);
	}
	/** @type {number} */
	get cents() {
		return this - (this.dollars * 100);
	}

	/**
	 * Convert the money into a string
	 * @param {boolean} [dollarSign] if true, prepends a dollar sign to the string
	 * @returns {string}
	 */
	toString(dollarSign = false) {
		const centsString = this.cents.toString().replace('.', '');
		const $ = dollarSign ? '$' : '';
		return `${$}${this.dollars}.${centsString}`;
	}

	/**
	 * Convert the money into a float instead of an integer
	 */
	toFloat() {
		return this / 100;
	}
}