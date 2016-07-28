import {Money} from '../../ubc-farm-utils/index.js';

/**
 * Calculates the total amount of money in the provided column using the given
 * data.
 * @param {Map<string, Object>} data
 * @param {Column} totalColumn
 * @returns {Money}
 */
export function calculateTotal(data, totalColumn) {
	let total = 0;
	for (const rowData of data.values()) {
		const rowValue = totalColumn.getValue(rowData);
		if (!Money.isNaN(rowValue)) total += rowValue;
	}
	return new Money(total);
}

/**
 * @param {Map<string, Object>} data
 * @param {Column} totalColumn
 * @param {Money} [amountPaid] - amount of money paid so far. If omitted,
 * amountPaid and balanceDue won't be on the returned object.
 * @param {number} [VAT] - decimal converted to percentage, i.e.: 0.05 = 5% tax
 * @returns {Object} containing subtotal, total, amountPaid, and balanceDue.
 */
export function calculateInvoice(data, totalColumn, amountPaid, VAT = 0) {
	const subtotal = calculateTotal(data, totalColumn);
	const total = new Money(subtotal * (VAT + 1));
	if (amountPaid !== undefined) {
		return {
			subtotal, total, 
			amountPaid: new Money(amountPaid),
			balanceDue: new Money(total - amountPaid)
		};
	} else {
		return {subtotal, total};
	}
}

export const moneyTransformer = value => {
	const stripedNonNumbers = value.replace(/[^0-9\.]/g, '');
	return new Money(stripedNonNumbers, {convert: false});
}