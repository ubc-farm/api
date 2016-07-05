import React, { PropTypes, cloneElement } from 'react';
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

function* HeaderRow(columns, onClick, headerTransformer) {
	for (let column in columns) {
		if (typeof column === 'symbol') yield cloneElement(
			headerTransformer(column),
			{key: column, onClick: e => onClick(column)}
		);
		else yield (
			<th key={column}
					onClick={e => onClick(column)}
			>
				{column}
			</th>
		) 
	}
}

/**
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const THead = ({columns, onColumnClick, headerTransformer}) => (
	<thead>
		<tr>
			{HeaderRow(columns, onColumnClick, headerTransformer)}
		</tr>
	</thead>
)

THead.propTypes = {
	columns: PropTypes.instanceOf(Set),
	onColumnClick: PropTypes.func,
	headerTransformer: PropTypes.func,
}

export default THead;