import {connect} from 'react-redux';
import buildGrid from '../redux/action-build-grid.js';
import {activeGridSelector} from '../redux/selectors.js';
import GridForm from './grid-form.js';

export default connect(
	state => {
		const {baseWidth, baseHeight, angle} = activeGridSelector(state) || {};

		return {
			defaultWidth: baseWidth,
			defaultHeight: baseHeight,
			defaultAngle: angle
		}
	}, 
	dispatch => ({
		onSubmit(data) {dispatch(buildGrid(undefined, data))}
	}),
	undefined,
	{pure: false}
)(GridForm);