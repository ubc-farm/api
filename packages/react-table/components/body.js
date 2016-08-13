import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */
import Column from '../bits/column.js';
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
 * @param {Map<string, WeakMap<Column, *>>} props.data
 * @param {string[]} props.sortMap
 * @param {Set<string>} props.selected
 * @param {function} onSelect
 */
export default class Body extends PureComponent {
	static get propTypes() {return {
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
		data: PropTypes.instanceOf(Map).isRequired,
		sortMap: PropTypes.array,
		selected: PropTypes.instanceOf(Set),
		onSelect: PropTypes.func
	}}

	/** @returns {string[]} */
	static defaultSortMap(data) {
		return Array.from(data.keys());
	}

	render() {
		const {columns, selected, onSelect: onChange, data} = this.props;
		const {sortMap = Body.defaultSortMap(data)} = this.props;
		
		return (
			<tbody>{
				sortMap.map(rowKey => {
					const checked = selected && selected.has(rowKey);
					const rowData = data.get(rowKey);

					return (
						<Row {...{rowKey, checked, onChange}} showCheckbox key={rowKey}>
							{columns.map(column => 
								column.toElement(column.getValue(rowData), rowKey)
							)}
						</Row>
					);
				})
			}</tbody>
		);
	}
}