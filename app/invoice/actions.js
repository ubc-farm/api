import Money from '../../lib/money/index.js';

export const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const EVERYTHING_SELECTION = 'EVERYTHING_SELECTION';
export const ADD_DATA_ROW = 'ADD_DATA_ROW';
export const REMOVE_DATA_ROWS = 'REMOVE_DATA_ROWS';
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

export function setAmountPaid(amount) {
	if (!amount instanceof Money) amount = new Money(amount);
	return {type: SET_AMOUNT_PAID, amountPaid: amount};
}