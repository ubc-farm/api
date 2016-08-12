import {connect} from 'react-redux';
import {Body} from '../../react-table/index.js';

import {
	columnSelector,
	selectedSelector,
	dataSelector
} from '../redux/selectors.js';
import {toggleRowSelection} from '../redux/actions.js';

export default connect(
	state => ({
		columns: columnSelector(state),
		selected: selectedSelector(state),
		data: dataSelector(state)
	}),
	dispatch => ({
		onSelect(rowKey) {dispatch(toggleRowSelection(rowKey))}
	})
)(Body);