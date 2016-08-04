import {Money, id as randomId} from '../../ubc-farm-utils/index.js';

import columnList from '../columnlist.js';
import {
	TOGGLE_SELECTION, CLEAR_SELECTION, EVERYTHING_SELECTION,
	ADD_DATA_ROW, REMOVE_DATA_ROWS, CHANGE_DATA,
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
			const data = new Map(state.data).set(id, rowData);
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
		case CHANGE_DATA: {
			const {atRowKey, atColumn, newValue} = action;
			let data = new Map(state.data), newRow = new WeakMap();
			const oldRow = data.get(atRowKey);

			newRow.set(atColumn, newValue);
			for (const col of columnList) {
				if (oldRow.has(col) && col !== atColumn) {
					newRow.set(col, oldRow.get(col));
				}
			}

			data.set(atRowKey, newRow);
			return setState({ data });
		}

		case SET_AMOUNT_PAID: {
			const {amountPaid} = action;
			return setState({ amountPaid });
		}

		default: return state;
	}
}