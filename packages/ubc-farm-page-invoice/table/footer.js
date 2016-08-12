import {connect} from 'react-redux';
import {Money} from '../../ubc-farm-utils/index.js';

import {setAmountPaid} from '../redux/actions.js';
import {
	amountPaidSelector,
	totalColumnSelector,
	subtotalSelector,
	totalSelector,
	balanceDueSelector,
	calculatePositionOffset
} from '../redux/selectors.js';
import Footer from './footer-base.js';

export function transformMoney(value) {
	const strippedNonNumbers = value.replace(/[^0-9\.]/g, '');
	return new Money(strippedNonNumbers, {convert: false})
}

export default connect(
	state => {
		const {leftPad, rightPad} = calculatePositionOffset(state);

		return {
			amountPaid: amountPaidSelector(state),
			totalColumn: totalColumnSelector(state),
			leftPad, rightPad,
			subtotal: subtotalSelector(state),
			total: totalSelector(state),
			balanceDue: balanceDueSelector(state)
		};
	},
	dispatch => ({
		onAmountChange: value => {
			const val = transformMoney(value);
			return dispatch(setAmountPaid(val));
		}
	})
)(Footer)