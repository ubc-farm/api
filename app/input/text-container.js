import {connect} from 'react-redux';
import Text from './text.js';

const TextField = connect(
	(state, {storeName}) => ({
		value
	}),
	dispatch => ({
		onChange: value => {},
		onFocus: focusState => {}
	})
)(TextField);