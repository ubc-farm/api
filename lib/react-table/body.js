import React, { PropTypes, cloneElement } from 'react';
import {id} from 'lib/utils';

/**
 * @param {Map<K, ReactElement>} props.row
 * @param {Set<K>} props.columns
 * @param {function} props.transformer
 * @param {ReactElement} [props.td]
 * @returns {Generator<ReactElement>}
 */
export function* TableRowCells(
	{row, columns, transformer, td = <td/>, onCellClick}
) {
	for (let column of columns) {
		const props = {key: column, onClick: () => onCellClick(column)};
		const child = row.get(column);
		if (typeof column === 'symbol') {
			const element = transformer(column, child, row);
			if (element === undefined) yield cloneElement(td, props, child);
			else yield cloneElement(element, props);
		}
		else yield cloneElement(td, props, child);
	}
}

/**
 * @param {Set<Map<K, ReactElement>>} props.data
 * @param {function} props.onRowClick
 * @returns {Generator<ReactElement>}
 */
export function* TableBodyRows(props) {
	for (const row of props.data) {
		const key = toString.call(row) === '[object Object]' ? id() : row;

		yield (
			<tr key={key} 
				onClick={() => props.onRowClick(row)}
			>
				{TableRowCells(Object.assign({}, props, { row }))}
			</tr>
		)
	}
}

/**
 * @param {Set<Map<node, node>>} props.data
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const TBody = props => (
	<tbody>
		{TableBodyRows(props)}
	</tbody>
)

TBody.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired,
	columns: PropTypes.instanceOf(Set).isRequired,
	onRowClick: PropTypes.func,
	transformer: PropTypes.func
}

export default TBody;