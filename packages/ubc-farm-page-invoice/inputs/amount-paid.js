import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {Cell} from '../../react-table/index.js';

import {
	amountPaidSelector,
	totalColumnSelector
} from '../redux/selectors.js';
import {setAmountPaid} from '../redux/actions.js';
import UpdateOnBlur from '../small-components/input-change-on-blur.js';

const AmountPaidCell = ({value, onChange, cellProps}) => (
	<Cell {...cellProps}>
		<UpdateOnBlur value={value} onBlur={onChange}>
			<input type='text' />
		</UpdateOnBlur>
	</Cell>
)

AmountPaidCell.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	cellProps: PropTypes.object
}

console.log(AmountPaidCell)

export default connect(
	state => ({
		value: amountPaidSelector(state).toString(),
		cellProps: totalColumnSelector(state).toJSON()
	}),
	dispatch => ({
		onChange(value) {dispatch(setAmountPaid(value))}
	})
)(AmountPaidCell)