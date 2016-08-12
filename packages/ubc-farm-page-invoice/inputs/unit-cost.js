import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {Money} from '../../ubc-farm-utils/index.js';

import {Column} from '../../react-table/index.js';
import StaticPlaceholder from '../small-components/input-static-placeholder.js';
import UpdateOnBlur from '../small-components/input-change-on-blur.js';

import {changeData} from '../redux/actions.js';
import {dataSelector} from '../redux/selectors.js';

const UnitCostInput = ({value, placeholder, onBlur}) => (
	<UpdateOnBlur onBlur={onBlur} value={value}>
		<StaticPlaceholder 
			style={{maxWidth: '5em'}}
			placeholder={placeholder}
		/>
	</UpdateOnBlur>
);

UnitCostInput.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func
}

const UnitCostInputConnected = connect(
	(state, {rowKey, column}) => {
		const data = dataSelector(state);
		const value = column.getValue(data.get(rowKey));

		return { value };
	},
	(dispatch, {rowKey, column}) => ({
		onBlur(value) {
			const strippedNonNumbers = value.replace(/[^0-9\.]/g, '');
			value = new Money(strippedNonNumbers, {convert: false});

			dispatch(changeData(value, rowKey, column));
		}
	})
)

UnitCostInputConnected.propTypes = {
	column: PropTypes.instanceOf(Column),
	rowKey: PropTypes.any,
	placeholder: PropTypes.string
}

export default UnitCostInputConnected;