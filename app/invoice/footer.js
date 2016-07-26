import React, {Component, PropTypes} from 'react';
import Money from '../../lib/money/index.js';
import {Column, Cell} from '../../lib/table-controls/index.js';
import {classlist as cx} from '../../lib/utils/index.js';
import {UpdateOnBlur} from './input-cell.js';

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


/**
 * Table row used to show totals
 */
const TotalRow = ({
	dark, column, leftPad, rightPad, 
	children: [title, value]
}) => (
	<tr className={cx('total-row', {'total-row-dark': dark})}>
		<th scope='row' className='align-right' colSpan={leftPad}>{title}</th>
		{column.toElement(value)}
		{rightPad ? <td colSpan='0' /> : null}
	</tr>
)
TotalRow.propTypes = {
	dark: PropTypes.bool,
	column: PropTypes.instanceOf(Column),
	leftPad: PropTypes.number,
	rightPad: PropTypes.number,
	children: PropTypes.array
}

export default class InvoiceTotalsFooter extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)),
		totalColumn: PropTypes.instanceOf(Column).isRequired,
		amountPaid: PropTypes.instanceOf(Money),
		VAT: PropTypes.number,
		onAmountChange: PropTypes.func
	}}

	constructor(props) {
		super(props);
		const {totalColumn, columns} = props;

		let i = 0, indexOf;
		for (const column of columns) {
			if (totalColumn === column) {
				indexOf = i;
				break;
			} else i++;
		}

		const columnCount = columns.length;
		
		this.state = {
			leftPad: indexOf + 1,
			rightPad: columnCount - indexOf - 1
		};
	}

	render() {
		const {leftPad, rightPad} = this.state;

		const {data, totalColumn, amountPaid, VAT, onAmountChange} = this.props;
		const {subtotal, total, balanceDue} = calculateInvoice(
			data, totalColumn, amountPaid, VAT
		);
		
		return (
			<tfoot>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<strong>Subtotal</strong>
					{subtotal}
				</TotalRow>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<strong>Total</strong>
					{total}
				</TotalRow>
				{amountPaid !== undefined ? 
					<tr className='total-row'>
						<th scope='row' className='align-right' colSpan={leftPad}>
							<span>Amount Paid</span>
						</th>
						<Cell {...totalColumn.toJSON()}>
							<UpdateOnBlur value={amountPaid}
								onBlur={onAmountChange}
							/>
						</Cell>
						{rightPad ? <td colSpan='0' /> : null}
					</tr>
				: null}
				{balanceDue !== undefined ?
					<TotalRow {...{leftPad, rightPad}} column={totalColumn} dark>
						<strong>Balance Due (CAD)</strong>
						{balanceDue}
					</TotalRow>	
				: null}
			</tfoot>
		);
	}
}