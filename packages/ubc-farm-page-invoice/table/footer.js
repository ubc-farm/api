import {connect} from 'react-redux';
import {price} from '../columnlist.js';
import {moneyTransformer} from '../redux/calculate-money.js';
import {setAmountPaid} from '../redux/actions.js';
import Footer from './footer-base.js';

export default connect(
	({data, amountPaid}) => ({
		data, amountPaid,
		totalColumn: price
	}),
	dispatch => ({
		onAmountChange: value => {
			value = moneyTransformer(value);
			return dispatch(setAmountPaid(value));
		}
	})
)(Footer)