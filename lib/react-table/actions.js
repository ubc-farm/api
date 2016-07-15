import {id} from 'lib/utils';

export const SORT_TABLE = 'SORT_TABLE';
export const TOGGLE_CHECKBOX_TABLEROW = 'TOGGLE_CHECKBOX_TABLEROW';
export const MAKE_TABLE = 'MAKE_TABLE';
export const CHANGE_DISPLAYED_DATA = 'CHANGE_DISPLAYED_DATA';
export const CHANGE_POSITION = 'CHANGE_POSITION';

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

export function changeTablePosition(tableId, start, end) {
	return { type: CHANGE_POSITION, id: tableId, start, end }
}

export function paginateTable(id, direction = 1) {
	return (dispatch, getState) => {
		const {startIndex, endIndex} = getState().tables[id];
		const pageLength = (endIndex - startIndex) * direction;

		dispatch(changeTablePosition(
			id, 
			startIndex + pageLength, 
			endIndex + pageLength
		));
	}
}

export function changeDisplayedData(id, newData) {
	return { type: CHANGE_DISPLAYED_DATA, id, data: newData };
}

export function filterTable(id, filterFunction) {
	return (dispatch, getState) => {
		if (typeof filterFunction === 'function') {
			const table = getState().tables[id];
			const allData = table.allData;

			let filteredData = new Set(), i = 0;
			for (const row in allData) {
				if (filterFunction(row, i, allData)) filteredData.add(row);
				i++;
			}

			dispatch(changeDisplayedData(id, filteredData));
		} else dispatch(changeDisplayedData(id, undefined))
	}
}