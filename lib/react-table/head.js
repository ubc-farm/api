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

/**
 * @param {Set<node>} props.columns
 * @param {function} props.onColumnClick
 * @param {function} props.headerTransformer
 * @param {ReactElement} [props.th]
 * @returns {Generator<ReactElement>}
 */
function* HeaderRow({columns, onColumnClick, headerTransformer, th = <th/>}) {
	for (let column in columns) {
		const props = {key: column, onClick: e => onColumnClick(column)};
		if (typeof column === 'symbol') {
			const element = headerTransformer(column, columns);
			if (element === undefined) yield cloneElement(th, props, column);
			else yield cloneElement(element, props);
		}
		else yield cloneElement(th, props, column);
	}
}

/**
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