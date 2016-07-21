import {format} from '../../lib/utils/index.js';
import {createElement} from 'react';
import Cell from './cell.js';

/**
 * Used to define attributes of a table column
 */
export default class Column {
	/**
	 * @param {Object} props
	 * @param {string} props.columnKey - ID for the column, should be unique
	 * @param {string} [props.title] - title used in header cell. By default, it
	 * is created from formatting the columnKey.
	 * @param {string} [props.description] - shown when hovering on header cell
	 * @param {string} [props.align=left] - text alignment for the column cells.
	 * @param {function} [props.compareFunc] - used for sorting. 
	 * Omitting means sorting is disabled for the column.
	 * @param {function} props.toElement - used to turn the data into a react
	 * element.
	 */
	constructor(props) {
		const {columnKey, description} = props;
		const {title = format(columnKey), align = 'left'} = props;
		const {toElement = Column.defaultToElementFunc} = props;
		const {compareFunc = Column.defaultCompareFunc} = props;
		Object.assign(this, {
			columnKey, title, description, 
			align, toElement, compareFunc,
			useSorting: compareFunc? true:false
		});
	}

	static defaultToElementFunc(value, props) {
		return createElement(Cell, props, value);
	}

	static defaultCompareFunc(a, b) {
		if (typeof a === 'string')
			return a.localeCompare(b);
		else if (typeof a === 'number') 
			return b - a;
		else return 0; 
	}
}