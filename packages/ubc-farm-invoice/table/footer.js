import {connect} from 'react-redux';
import Footer from './footer-base.js';
import {price} from '../columnlist.js';
import {moneyTransformer} from '../redux/calculate-money.js';
import {setAmountPaid} from '../redux/actions.js';

export default connect(
	({data, columns, amountPaid}) => ({
		data, columns, amountPaid,
		totalColumn: price
	}),
	dispatch => ({
		onAmountChange: value => {
			value = moneyTransformer(value);
			return dispatch(setAmountPaid(value));
		}
	})
)(Footer)