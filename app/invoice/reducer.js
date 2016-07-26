import {id as randomId} from '../../lib/utils/index.js';
import Money from '../../lib/money/index.js';
import {
	TOGGLE_SELECTION, CLEAR_SELECTION, EVERYTHING_SELECTION,
	ADD_DATA_ROW, REMOVE_DATA_ROWS,
	SET_AMOUNT_PAID
} from './actions.js';

/**
 * @name invoiceState
 * @property {Map<R, WeakMap<Column, *>>} data
 * @property {Set<R>} selected
 * 
 * @property {number} amountPaid
 */
const initialState = {
	data: new Map(),
	selected: new Set(),
	amountPaid: new Money(0)
}

export default function invoiceApp(state = initialState, action) {
	const setState = (...args) => Object.assign({}, state, ...args);
	switch (action.type) {
		case TOGGLE_SELECTION: {
			const {rowId} = action;
			let selected = new Set(state.selected);
			
			if (selected.has(rowId)) selected.delete(rowId);
			else selected.add(rowId);

			return setState({ selected });
		}
		case CLEAR_SELECTION: {
			return setState({ selected: new Set() });
		}
		case EVERYTHING_SELECTION: {
			return setState({ selected: new Set(state.data.keys()) })
		}

		case ADD_DATA_ROW: {
			const {id = randomId(), rowData = new WeakMap()} = action;
			const data = new Map(state.data).add(id, rowData);
			return setState({ data });
		}
		case REMOVE_DATA_ROWS: {
			const {ids = new Set()} = action, oldData = state.data;
			let data = new Map();
			for (const [id, row] of oldData) {
				if (!ids.has(id)) data.set(id, row);
			}
			return setState({ data });
		}

		case SET_AMOUNT_PAID: {
			const {amountPaid} = action;
			return setState({ amountPaid });
		}

		default: return state;
	}
}