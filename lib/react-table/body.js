import React, { PropTypes } from 'react';
/** @type {Set< Map<Node(ColumnHead), Node> >} */

function* TableRowCells(map, columns) {
	for (let column of columns) 
		yield <td key={column}>{map.get(column)}</td>
}

function* TableBodyRows(data, columns) {
	for (let row of data)
		yield <tr key={row}>{TableRowCells(row, columns)}</tr>
}

/**
 * @param {Set<Map<node, node>>} props.data
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const TBody = ({data, columns}) => (
	<tbody>
		{TableBodyRows(data, columns)}
	</tbody>
)

TBody.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired,
	columns: PropTypes.any.isRequired
}

export default TBody;