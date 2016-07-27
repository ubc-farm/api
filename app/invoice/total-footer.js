import {connect} from 'react-redux';
import Footer from './footer.js';
import {price, moneyTransformer} from './invoice-columns.js';
import {setAmountPaid} from './actions.js';

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
	}),
	undefined,
	{pure: false}
)(Footer)