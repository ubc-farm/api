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
	 * @param {function} props.getValue - Used to transform data into a value 
	 * for the cell and for sorting
	 */
	constructor(props) {
		if (typeof props === 'string') props = {columnKey: props};

		const {title = format(props.columnKey), align = 'left'} = props;
		const {toElement = Column.defaultToElementFunc.bind(this)} = props;
		const {getValue = Column.defaultGetValueFunc.bind(this)} = props;
		
		let {compareFunc} = props;
		if (compareFunc && typeof compareFunc !== 'function') //if truthy
			compareFunc = Column.defaultCompareFunc;

		Object.assign(this, props, {
			title, align, toElement, compareFunc, getValue,
			useSorting: props.compareFunc? true : false
		});
		Object.freeze();
	}

	/** @returns {Object} the column object as a plain object */
	toJSON() {
		return [...Object.keys(this), 'key']
			.reduce((obj, key) => {obj[key] = this[key]; return obj}, {});
	}

	/** @returns {string} columnKey */
	toString() {return this.columnKey;}
	get key()  {return this.columnKey;}

	static defaultToElementFunc(value, rowKey) {
		return createElement(Cell, this.toJSON(), value);
	}

	static defaultCompareFunc(a, b) {
		if (typeof a === 'string' || typeof b === 'string')
			return String(a).localeCompare(b);
		else if (typeof a === 'number' || typeof b === 'number') 
			return b - a;
		else return 0; 
	}

	static defaultGetValueFunc(rowData, column = this) {
		return rowData.get(column);
	}
}