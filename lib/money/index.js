/**
 * Class used to represent money. 
 * Internally represents its value as an integer, to avoid float math issues
 * @extends Number
 * @alias module:lib/money.default
 * @typicalname money
 */
export default class Money extends Number {
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
	 * @param {boolean} [opts.dollarSign=true] if true, prepends a dollar sign 
	 * to the string
	 * @param {boolean} [opts.useMinusSign=false] normally negative amounts are
	 * wrapped in parenthesis. If useMinusSign is true, a negative sign will
	 * be prefixed to the string instead
	 * @param {string} [opts.currency=USD] currency code to use
	 * @param {string} [opts.currencyDisplay=symbol] currency style to use
	 * @param {boolean} [opts.useGrouping=true] wheter or not to 
	 * use thousands seperators
	 * @returns {string}
	 */
	toString({
		dollarSign = true, 
		useMinusSign = false, 
		currency = 'USD',
		currencyDisplay,
		useGrouping
	} = {}) {
		let value = this.toFloat();
		if (!useMinusSign) value = Math.abs(value);

		let str;
		if (dollarSign) {
			str = value.toLocaleString(undefined, 
				{style: 'currency', currency, currencyDisplay, useGrouping});
		} else {
			str = value.toLocaleString(undefined, 
				{style: 'decimal', minimumFractionDigits: 2, useGrouping});
		}

		if (useMinusSign) return str;
		else return `(${str})`;
	}

	/**
	 * Convert the money into a float instead of an integer
	 */
	toFloat() {
		return this / 100;
	}

	/**
	 * Checks if the given money is not a number. This function avoids the 
	 * coersion used by the global isNaN function, but Number.isNaN doesn't work
	 * properly with number extensions like Money. 
	 * @returns {boolean} 
	 */
	static isNaN(money) {
		return Number.isNaN(money.valueOf());
	}
}