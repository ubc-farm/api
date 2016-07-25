import React, {Component, PropTypes} from 'react';
import Money from '../../lib/money/index.js';
import {Column} from '../../lib/table-controls/index.js';
import {classlist as cx} from '../../lib/utils/index.js';
import InputCell from './input-cell.js';

/**
 * Calculates the total amount of money in the provided column using the given
 * data.
 * @param {Map<string, Object>} data
 * @param {Column} totalColumn
 * @returns {Money}
 */
export function calculateTotal(data, totalColumn) {
	const totalColumnKey = totalColumn.columnKey;

	let total = 0;
	for (const [rowKey, rowData] of data) {
		const rowValue = totalColumn.getValue(rowData, totalColumnKey, rowKey);
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
		{column.toElement(value, column.toJSON())}
		{rightPad ? <td colSpan='0'/> : null}
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
		totalColumnKey: PropTypes.string.isRequired,
		amountPaid: PropTypes.oneOfType([
			PropTypes.number, PropTypes.instanceOf(Money)
		]),
		invoiceTotals: PropTypes.shape({
			subtotal: PropTypes.instanceOf(Money),
			total: PropTypes.instanceOf(Money)
		}),
		VAT: PropTypes.number
	}}

	constructor(props) {
		super(props);
		const {totalColumnKey, columns} = props;

		let i = 0, indexOf;
		for (const column of columns) {
			if (totalColumnKey === column.columnKey) {
				indexOf = i;
				break;
			} else i++;
		}

		const columnCount = columns.length;
		const totalColumn = columns.find(c => c.columnKey === totalColumnKey);
		
		this.state = {
			leftPad: indexOf + 1,
			rightPad: columnCount - indexOf - 1,
			totalColumn
		};
	}

	render() {
		const {totalColumn, leftPad, rightPad} = this.state;
		const {data, amountPaid, VAT} = this.props;

		const invoiceTotals = this.props.invoiceTotals 
			|| calculateInvoice(data, totalColumn, amountPaid, VAT);
		const {subtotal, total, balanceDue} = invoiceTotals;
		
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
						<InputCell
							cellProps={totalColumn.toJSON()}
							inputProps={{defaultValue: amountPaid || 0}}
						/>
						{rightPad ? <td colSpan='0'/> : null}
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