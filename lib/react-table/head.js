import React, { PropTypes } from 'react';
/** @type {Set< Map<Node(ColumnHead), Node> >} */

/**
 * Computes the columns used by the table data
 * @param {Set<Map<K, any>>} data
 * @returns {Set<K>} the unique columns
 */
export function computeColumns(data) {
	let results = new Set();
	for (let row of data) 
		for (let column of row.keys()) results.add(column);
	return results;
}

function* HeaderRow(columns) {
	for (let column in columns) 
		yield <th key={column}>{column}</th>
}

/**
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const THead = ({columns}) => (
	<thead>
		<tr>
			{HeaderRow(columns)}
		</tr>
	</thead>
)

THead.propTypes = {
	columns: PropTypes.instanceOf(Set)
}

export default THead;