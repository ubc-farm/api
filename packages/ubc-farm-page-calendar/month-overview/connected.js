import {connect} from 'react-redux';
import DatePickerTable from '../date-picker/table.js';
import {adjustViewingMonth, setViewingDate} from '../redux/actions.js';

export default connect(
	state => ({
		viewingDate: state.viewingDate,
		selectedDate: state.viewingDate,
		todayDate: state.today
	}),
	dispatch => ({
		onPrevious: () => dispatch(adjustViewingMonth(-1)),
		onFollowing: () => dispatch(adjustViewingMonth(1)),
		onDateClick: date => dispatch(setViewingDate(date))
	})
)(DatePickerTable);