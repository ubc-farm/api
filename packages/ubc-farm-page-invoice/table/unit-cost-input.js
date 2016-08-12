import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {Cell} from '../../react-table/index.js';

import {
	amountPaidSelector,
	totalColumnSelector
} from '../redux/selectors.js';
import {setAmountPaid} from '../redux/actions.js';

import UpdateOnBlur from '../small-components/input-change-on-blur.js';
import StaticPlaceholder from '../small-components/input-static-placeholder.js';

const UnitCostInput = ({value, onChange, placeholder, rowKey, column}) => (
	<UpdateOnBlur value={value} onBlur={onChange}>
		<StaticPlaceholder 
			placeholder={placeholder}
			style={{maxWidth: '5em'}} 
		/>
	</UpdateOnBlur>
)

UnitCostInput.propTypes = {
	placeholder: PropTypes.string,

}

export default connect(
	state => ({
		value: amountPaidSelector(state).toString(),
		cellProps: totalColumnSelector(state).toJSON()
	}),
	dispatch => ({
		onChange(value) {dispatch(setAmountPaid(value))}
	})
)(UnitCostInput)