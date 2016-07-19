/**
 * Used to define attributes of a table column
 */
export default class Column {
	/**
	 * @param {ReactElement|string} header - passed columnKey prop. 
	 * If header is a string, it is wrapped in a TH element. 
	 * Otherwise, the element is used as the header. 
	 * @param {ReactElement} cell - passed rowIndex and columnKey props. 
	 * Duplicated for each row.
	 * @param {string} columnKey - used as key for the column, 
	 * and passed to children
	 * @param {string} [align=left] - alignment for the column
	 */
	constructor({header, cell, columnKey, align = 'left'}) {
		Object.assign(this, {header, cell, columnKey, align});
	}
}