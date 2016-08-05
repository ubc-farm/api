import {connect} from 'react-redux';
import {toggleResize, toggleAdding} from '../redux/actions.js';

import ActionToolbar from './with-buttons.js';

export default connect(
	state => ({
		adding: state.mapMeta.adding,
		resizing: state.gridForm.get(state.active).resizing
	}),
	dispatch => ({
		onResize: () => dispatch(toggleResize()),
		onAdd: () => dispatch(toggleAdding())
	})
)(ActionToolbar);