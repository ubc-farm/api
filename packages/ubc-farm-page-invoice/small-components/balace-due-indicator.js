import {createElement as h} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {calculateInvoice} from '../redux/calculate-money.js'
import {price} from '../columnlist.js';

const Indicator = ({children}) => 
	<span className='detail-cell'>{children}</span>;

export default connect(
	state => {
		const {balanceDue} = calculateInvoice(state.data, price, state.amountPaid);
		return {children: balanceDue.toString()};
	}
)(Indicator);