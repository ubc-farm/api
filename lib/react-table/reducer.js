import {SORT_TABLE, TOGGLE_CHECKBOX_TABLEROW, MAKE_TABLE} from './actions.js';
import sortTable from './sort.js';
import {CHECKBOX} from './checkbox.js';

export default function tables(table = new Set(), action) {
	switch (action.type) {
		case SORT_TABLE:
			return sortTable(table, action.sortColumn);

		case TOGGLE_CHECKBOX_TABLEROW:
			const row = table.get(row);
			if (!row || !row.has(CHECKBOX)) break;
			else {
				const rowClone = new Map(row).set(CHECKBOX, action.checked);
				const tableClone = new Set();
				for (let tableRow in table) {
					if (tableRow === row) tableClone.add(rowClone);
					else tableClone.add(tableRow);
				}
				return tableClone;
			}

		default: return tables;
	}
}

export default function tables(tables = {}, action) {
	const {type, id} = action;
	switch (type) {
		case SORT_TABLE:
			return Object.assign({}, tables, {
				[id]: 
			})

		case TOGGLE_CHECKBOX_TABLEROW:

		case MAKE_TABLE:
			return Object.assign({}, tables, {
				[id]: action.data
			});

		default: return tables;
	}
}