import Money from '../../lib/money/index.js';

export const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const EVERYTHING_SELECTION = 'EVERYTHING_SELECTION';
export const ADD_DATA_ROW = 'ADD_DATA_ROW';
export const REMOVE_DATA_ROWS = 'REMOVE_DATA_ROWS';
export const CHANGE_SORT_COLUMN = 'CHANGE_SORT_COLUMN';
export const CHANGE_SORT_DIRECTION = 'CHANGE_SORT_DIRECTION';
export const TOGGLE_SORT_DIRECTION = 'TOGGLE_SORT_DIRECTION';
export const SET_AMOUNT_PAID = 'SET_AMOUNT_PAID';

export function toggleRowSelection(rowId) {
	return {type: TOGGLE_SELECTION, rowId};
}
export function selectNothing() {
	return {type: CLEAR_SELECTION};
}
export function selectEverything() {
	return {type: EVERYTHING_SELECTION};
}

export function addRow(rowData, rowId) {
	return {type: ADD_DATA_ROW, rowData, id: rowId};
}
export function removeRows(...rowIds) {
	const onlyOneParam = rowIds.length === 1, [firstId] = rowIds;
	let rowIdList;

	if (onlyOneParam && firstId instanceof Set) rowIdList = firstId;
	else if (onlyOneParam && Array.isArray(firstId)) rowIdList = new Set(firstId);
	else rowIdList = new Set(rowIds); 

	return {type: REMOVE_DATA_ROWS, ids: rowIdList};
}

export function changeSortColumn(column) {
	return {type: CHANGE_SORT_COLUMN, column};
}
export function setSortDescending(descending) {
	return {type: CHANGE_SORT_DIRECTION, descending}
}
export function changeSortDir(direction) {
	let descending;
	if (direction === 1) descending = false;
	else if (direction === -1) descending = true;
	else throw TypeError('direction must be 1 or -1');
	
	return setSortDescending(descending);
}
export function toggleSortDirection() {
	return {type: TOGGLE_SORT_DIRECTION};
}

export function setAmountPaid(amount) {
	if (!amount instanceof Money) amount = new Money(amount);
	return {type: SET_AMOUNT_PAID, amountPaid: amount};
}