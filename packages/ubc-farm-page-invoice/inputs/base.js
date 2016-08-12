import {connect} from 'react-redux';
import {changeData} from '../redux/actions.js'
import {dataSelector} from '../redux/selectors.js';
import StaticInput from '../small-components/input-static-placeholder.js';

const InvoiceInput = connect(
	(state, {rowKey, column}) => {
		const data = dataSelector(state);
		const value = column.getValue(data.get(rowKey));

		return {
			value,
			rowKey: undefined,
			column: undefined
		}
	},
	(dispatch, {rowKey, column}) => ({
		onChange: e => dispatch(changeData(e.target.value, rowKey, column))
	})
)(StaticInput);

export default InvoiceInput;