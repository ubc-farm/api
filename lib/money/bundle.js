var Money = (function () {
	'use strict';

	/**
	 * Class used to represent money. 
	 * Internally represents its value as an integer, to avoid float math issues
	 * @extends Number
	 * @alias module:lib/money.default
	 * @typicalname money
	 */
	class Money extends Number {
		/**
		 * @param {number|number[]} money - if an array, 
		 * uses money[0] as dollars and money[1] as cents. If a float, try to convert
		 * it to an integer representing cents (multiply by 100).
		 * @param {Object} [options]
		 * @param {boolean} [options.convert=true] - if false, parse the money
		 * integer as dollars instead of cents.
		 * @param {number} [options.exactness=0] - lets you use cent values smaller 
		 * than $0.01. 
		 */
		constructor(money, {convert = true, exactness = 0} = {}) {
			let dollars, cents = 0;
			if (Array.isArray(dollars)) [dollars, cents] = money;
			else if (!Number.isInteger(money)) {
				dollars = Math.trunc(money);
				cents = (money - dollars) * 100;
			} else if (convert) {
				super(money);
				return;
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
		toString(dollarSign = true) {
			let centsString = this.cents.toString().replace('.', '');
			if (centsString.length == 1) centsString = '0' + centsString;
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

	return Money;

}());