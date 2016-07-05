import React, { PropTypes, cloneElement } from 'react';
/** @type {Set< Map<Node(ColumnHead), Node> >} */

function* TableRowCells(map, columns, transformer) {
	for (let column of columns) {
		if (typeof column === 'symbol') 
			yield cloneElement(
				transformer(column, map.get(column)),
				{key: column}
			);
		else 
			yield <td key={column}>{map.get(column)}</td>
	}
		
}

function* TableBodyRows(data, columns, onClick, transformer) {
	for (let row of data) yield (
		<tr key={row} 
		    onClick={e => onClick(row)}
		>
			{TableRowCells(row, columns, transformer)}
		</tr>
	)
}

/**
 * @param {Set<Map<node, node>>} props.data
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const TBody = ({data, columns, onRowClick, transformer}) => (
	<tbody>
		{TableBodyRows(data, columns, onRowClick, transformer)}
	</tbody>
)

TBody.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired,
	columns: PropTypes.instanceOf(Set).isRequired,
	onRowClick: PropTypes.func,
	transformer: PropTypes.func
}

export default TBody;