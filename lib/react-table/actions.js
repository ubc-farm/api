import {id} from 'lib/utils';

export const SORT_TABLE = 'SORT_TABLE';
export const TOGGLE_CHECKBOX_TABLEROW = 'TOGGLE_CHECKBOX_TABLEROW';
export const MAKE_TABLE = 'MAKE_TABLE';

export function sortTableTowards(tableId, sortColumn, direction) {
	return { type: SORT_TABLE, id: tableId, sortColumn, direction };
}

export function toggleCheckboxTableRow(tableId, row, checked = true) {
	return { type: TOGGLE_CHECKBOX_TABLEROW, id: tableId, row, checked };
}

export function makeTableWithId(tableData, tableId) {
	return { type: MAKE_TABLE, id: tableId, data: tableData };
}

export function makeTable(tableData) {
	return dispatch => dispatch( makeTableWithId(tableData, id()) );
}

export function sortTable(tableId, sortColumn) {
	return (dispatch, getState) => {
		const currentColumn = getState().tables[tableId].sortColumn;
		const currentDirection = getState().tables[tableId].sortDirection;

		let newDirection = 1;
		if (currentColumn === sortColumn) newDirection = currentDirection * -1;

		dispatch( sortTableTowards(tableId, sortColumn, newDirection) );
	}
}