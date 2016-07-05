import {id} from 'lib/utils';

export const SORT_TABLE = 'SORT_TABLE';
export const TOGGLE_CHECKBOX_TABLEROW = 'TOGGLE_CHECKBOX_TABLEROW';
export const MAKE_TABLE = 'MAKE_TABLE';

export function sortTable(tableId, sortColumn) {
	return { type: SORT_TABLE, id: tableId, sortColumn };
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