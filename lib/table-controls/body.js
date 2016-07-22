import React, {Component, PropTypes} from 'react';
import Column from './column.js';
import Row from './row.js';

/**
 * Used for the body of the table. Rows are generated where the columns
 * are based on the columns provided. The order of the rows can be altered
 * by providing a sortMap, which is a map where the keys correspond to the 
 * row's desired position, and the values correspond to the actual row key in
 * the data map. Rows can be marked as selected using the selected array, where
 * each string in the array corresponds with a key in the data map.
 * @param {Object} props
 * @param {Column[]} props.columns
 * @param {Map<string, Object>} props.data
 * @param {Map<string, string>} props.sortMap
 * @param {Set<string>} props.selected
 * @param {function} onSelect
 */
export default class Body extends Component {
	static get propTypes() {return {
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
		data: PropTypes.instanceOf(Map).isRequired,
		sortMap: PropTypes.instanceOf(Map),
		selected: PropTypes.instanceOf(Set),
		onSelect: PropTypes.func
	}}

	/** 
	 * @returns {Map<number, string>} A map containing the keys from data as 
	 * values, with their index set as the key. 
	 */
	static defaultSortMap(data) {
		let sortMap = new Map(), i = 0;
		for (const id of data.keys()) {
			sortMap.set(i, id);
			i++;
		}
		return sortMap;
	}

	render() {
		const {columns, selected, onSelect, data} = this.props;
		const {sortMap = Body.defaultSortMap(data)} = this.props;
		
		let rows = Array(data.length);

		for (const [index, rowKey] of sortMap) {
			const checked = selected && selected.has(rowKey);
			const rowData = data.get(rowKey);

			rows[index] = (
				<Row {...{rowKey, checked}} showCheckbox
					onChange={onSelect} key={rowKey}
				>
					{columns.map(column => {
						const {toElement, columnKey, getValue} = column;
						return toElement(
							getValue(rowData, columnKey), 
							column.toJSON(), 
							rowKey
						);
					})}
				</Row>
			);
		}

		return <tbody>{rows}</tbody>
	}
}