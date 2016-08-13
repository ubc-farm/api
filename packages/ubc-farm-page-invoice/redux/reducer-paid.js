import {Money} from '../../ubc-farm-utils/index.js';
import {SET_AMOUNT_PAID} from './actions.js';

export default function amountPaid(state = new Money(0), action) {
	if (action.type === SET_AMOUNT_PAID) {
		return action.amountPaid;
	} else {
		return state;
	}
}