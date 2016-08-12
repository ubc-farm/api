import data, {columns, totalColumn, VAT} from './reducer-data.js';
import amountPaid from './reducer-paid.js';
import selected from './reducer-selected.js';

// data MUST come before selected
const reducers = {
	data, 
	amountPaid, 
	selected, 
	columns, 
	totalColumn, 
	VAT
};

/** Static reducers don't change value, so just hold onto their output here */
const cache = {
	columns: columns(),
	totalColumn: totalColumn(),
	VAT: VAT()
}

export default function combinedReducer(state = {}, action) {
	let hasChanged = false;
	let nextState = {};

	for (const key in reducers) {
		const reducer = reducers[key];
		const previousStateForKey = state[key];
		
		let nextStateForKey;
		switch (key) {
			case 'selected':
				nextStateForKey = reducer(previousStateForKey, action, nextState.data);
				break;
			case 'columns': case 'totalColumn': case 'VAT':
				nextStateForKey = cache[key];
				break;
			default: 
				nextStateForKey = reducer(previousStateForKey, action);
				break;
		}

		if (nextStateForKey === undefined) {
			throw new Error(`Reducer ${key} returned undefined`);
		}
		nextState[key] = nextStateForKey;
		hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	}
	return hasChanged ? nextState : state;
}