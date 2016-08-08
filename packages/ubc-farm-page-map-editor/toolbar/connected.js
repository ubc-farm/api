import {connect} from 'react-redux';
import {toggleResize, toggleAdding} from '../redux/actions.js';

import ActionToolbar from './with-buttons.js';

export default connect(
	state => {
		const gridData = state.gridForm.get(state.active) || {};
		return {
			adding: state.mapMeta.adding,
			resizing: gridData.resizing
		}
	},
	dispatch => ({
		onResize: () => dispatch(toggleResize()),
		onAdd: () => dispatch(toggleAdding())
	})
)(ActionToolbar);