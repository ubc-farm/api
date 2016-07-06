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

function* HeaderRow({columns, onClick, headerTransformer, th = <th/>}) {
	for (let column in columns) {
		const props = {key: column, onClick: e => onClick(column)};
		if (typeof column === 'symbol') {
			const element = headerTransformer(column, columns);
			if (element === undefined) yield cloneElement(th, props, column);
			else yield cloneElement(element, props);
		}
		else yield cloneElement(th, props, column);
	}
}

/**
 * @param {Set<node>} props.columns
 * @return {ReactElement}
 */
const THead = (props) => (
	<thead>
		<tr>{HeaderRow(props)}</tr>
	</thead>
)

THead.propTypes = {
	columns: PropTypes.instanceOf(Set),
	onColumnClick: PropTypes.func,
	headerTransformer: PropTypes.func,
}

export default THead;