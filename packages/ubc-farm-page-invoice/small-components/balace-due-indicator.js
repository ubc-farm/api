import React from 'react';
import {connect} from 'react-redux';
import {calculateInvoice} from '../table/footer.js';
import {price} from '../columnlist.js';

const Indicator = ({children}) => 
	<span className='detail-cell'>{children}</span>;

export default connect(
	state => {
		const {balanceDue} = calculateInvoice(state.data, price, state.amountPaid);
		return {children: balanceDue.toString()};
	}
)(Indicator);