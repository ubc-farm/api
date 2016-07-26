import {id as randomId} from '../../lib/utils/index.js';
import Money from '../../lib/money/index.js';
import {
	TOGGLE_SELECTION, CLEAR_SELECTION, EVERYTHING_SELECTION,
	ADD_DATA_ROW, REMOVE_DATA_ROWS,
	CHANGE_SORT_COLUMN, CHANGE_SORT_DIRECTION, TOGGLE_SORT_DIRECTION,
	SET_AMOUNT_PAID
} from './actions.js';

/**
 * @name invoiceState
 * @property {Map<R, WeakMap<Column, *>>} data
 * @property {Set<R>} selected
 * 
 * @property {number} amountPaid
 * 
 * @property {Object} sort
 * @property {Column} sort.column
 * @property {boolean} sort.descending=true
 */
const initialState = {
	data: new Map(),
	selected: new Set(),
	amountPaid: new Money(0),
	sort: {
		column: undefined,
		descending: true
	}
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

		case CHANGE_SORT_COLUMN: {
			const {column} = action;
			const sort = {column, descending: true};
			return setState({ sort })
		}
		case CHANGE_SORT_DIRECTION: {
			const {descending = true} = action;
			const sort = Object.assign({}, state.sort, {descending});
			return setState({ sort });
		}
		case TOGGLE_SORT_DIRECTION: {
			const {descending = true} = state.sort;
			const sort = Object.assign({}, state.sort, {
				descending: !descending
			});
			return setState({ sort });
		}

		case SET_AMOUNT_PAID: {
			const {amountPaid} = action;
			return setState({ amountPaid });
		}

		default: return state;
	}
}