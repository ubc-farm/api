import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {Column, Cell} from '../../react-table/index.js';
import {Money, classlist as cx} from '../../ubc-farm-utils/index.js';

import UpdateOnBlur from '../small-components/input-change-on-blur.js';
import StaticInput from '../small-components/input-static-placeholder.js';

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



const InvoiceTotalsFooter = props => {
	const {totalColumn, onAmountChange} = props;
	const {amountPaid, subtotal, total, balanceDue} = props;
	const {leftPad, rightPad} = props;
	
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
						<UpdateOnBlur 
							value={amountPaid}
							onBlur={onAmountChange}
						>
							<StaticInput />
						</UpdateOnBlur>
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

InvoiceTotalsFooter.propTypes = {
	data: PropTypes.instanceOf(Map),
	columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
	totalColumn: PropTypes.instanceOf(Column).isRequired,
	amountPaid: PropTypes.instanceOf(Money),
	VAT: PropTypes.number,
	onAmountChange: PropTypes.func,
	leftPad: PropTypes.number,
	rightPad: PropTypes.number,
	subtotal: PropTypes.instanceOf(Money),
	total: PropTypes.instanceOf(Money),
	balanceDue: PropTypes.instanceOf(Money),
}

export default InvoiceTotalsFooter;