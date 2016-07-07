import {
	SORT_TABLE, 
	TOGGLE_CHECKBOX_TABLEROW, 
	CHANGE_POSITION, 
	MAKE_TABLE
} from './actions.js';
import sortTable from './sort.js';
import {CHECKBOX} from './interactive.js';

/** Reducer for individual table's data */
function tableData(data = new Set(), action) {
	switch (action.type) {
		case SORT_TABLE:
			return sortTable(data, action.sortColumn);

		case TOGGLE_CHECKBOX_TABLEROW:
			const row = data.get(row);
			if (!row || !row.has(CHECKBOX)) break;
			else {
				const rowClone = new Map(row).set(CHECKBOX, action.checked);
				const tableClone = new Set();
				for (let tableRow in data) {
					if (tableRow === row) tableClone.add(rowClone);
					else tableClone.add(tableRow);
				}
				return tableClone;
			}

		default: return data;
	}
}

/** Reducer for table */
function table(tableState = {}, action) {
	switch (action.type) {
		case SORT_TABLE:
			return Object.assign({}, tableState, {
				sortDirection: action.direction,
				sortColumn: action.sortColumn,
				data: tableData(tableState.data, action)
			})

		case TOGGLE_CHECKBOX_TABLEROW:
			return Object.assign({}, tableState, {
				data: tableData(tableState.data, action)
			})

		case CHANGE_POSITION:
			return Object.assign({}, tableState, {
				startIndex: action.start,
				endIndex: action.end
			});

		default: return tableState;
	}
}

/** Reducer for all tables. Passes data down to table reducer via ID */
export default function tables(tables = {}, action) {
	const {type, id} = action;
	switch (type) {
		case MAKE_TABLE:
			return Object.assign({}, tables, {
				[id]: action.data
			});
		
		case SORT_TABLE:
		case TOGGLE_CHECKBOX_TABLEROW:
		case CHANGE_POSITION:
			return Object.assign({}, tables, {
				[id]: table(tables[id], action)
			})

		default: return tables;
	}
}