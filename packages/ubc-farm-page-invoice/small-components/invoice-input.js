import {connect} from 'react-redux';
import {changeData} from './actions.js'
import StaticInput from './input-static-placeholder.js';
import UpdateOnBlur from './input-change-on-blur.js';

export default connect(
	(state, {rowKey, column}) => ({
		value: column.getValue(state.data.get(rowKey))
	}),
	(dispatch, {rowKey, column}) => ({
		onChange: e => dispatch(changeData(e.target.value, rowKey, column))
	})
)(StaticInput)

export const OnBlur = connect(
	(state, {rowKey, column}) => {
		const val = column.getValue(state.data.get(rowKey));
		return {
			value: val === undefined ? '' : String(val)
		};
	},
	(dispatch, {rowKey, column, transformerOut}) => ({
		onBlur: value => {
			const transformed = transformerOut(value);
			return dispatch(changeData(transformed, rowKey, column));
		}
	})
)(UpdateOnBlur)