import {connect} from 'react-redux';
import handleGridFormSubmit from '../redux/compute-geojson-action.js';
import GridForm from './grid-form.js';

export default connect(
	state => {
		const {active, gridForm} = state;
		const {width, height, angle} = gridForm.get(active);
		return {
			defaultWidth: width,
			defaultHeight: height,
			defaultAngle: angle
		}
	}, 
	dispatch => ({
		onSubmit(data) {dispatch(handleGridFormSubmit(data))}
	}),
	undefined,
	{pure: false}
)(GridForm);