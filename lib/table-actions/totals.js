import React, {Component, PropTypes} from 'react';
import Money from '../../lib/money/index.js';
import {Column} from '../../lib/table-controls/index.js';
import {classlist as cx} from '../../lib/utils/index.js';

const TotalRow = ({
	dark, column, leftPad, rightPad, 
	children: [title, value]
}) => (
	<tr className={cx('total-row', {'total-row-dark': dark})}>
		<th scope='row' className='align-right' colSpan={leftPad}>{title}</th>
		<td className='align-right'>{column.toElement(value, column.toJSON())}</td>
		{rightPad ? <td colSpan='0'/> : null}
	</tr>
)

TotalRow.propTypes = {
	dark: PropTypes.bool,
	column: PropTypes.instanceOf(Column),
	leftPad: PropTypes.number,
	rightPad: PropTypes.number,
	children: PropTypes.arrayOf(PropTypes.node)
}

export default class InvoiceTotalsFooter extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)),
		totalColumnKey: PropTypes.string.isRequired,
		amountPaid: PropTypes.oneOfType([
			PropTypes.number, PropTypes.instanceOf(Money)
		])
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
			leftPad: indexOf,
			rightPad: columnCount - indexOf - 1,
			totalColumn
		};
	}

	render() {
		const {totalColumn, leftPad, rightPad} = this.state;
		const {data, totalColumnKey, amountPaid} = this.props;

		let subtotal = 0;
		for (const [rowKey, rowData] in data) 
			subtotal += totalColumn.getValue(rowData, totalColumnKey, rowKey);
		subtotal = new Money(subtotal);

		const VAT = 1;
		const total = new Money(subtotal * VAT);

		const balanceDue = new Money(total - amountPaid);
		
		return (
			<tfoot>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<strong>Subtotal</strong>{subtotal}
				</TotalRow>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<strong>Total</strong>{total}
				</TotalRow>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<span>Amount Paid</span>{amountPaid}
				</TotalRow>
				<TotalRow {...{leftPad, rightPad}} column={totalColumn}>
					<strong>Balance Due (CAD)</strong>{balanceDue}
				</TotalRow>
			</tfoot>
		);
	}
}