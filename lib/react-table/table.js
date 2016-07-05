import React, { PropTypes } from 'react';
import THead, {computeColumns} from './head.js';
import TBody from './body.js';

/**
 * Constructs a table from the given data. 
 * @param {Set<Map<node, node>>} props.data
 * @return {ReactElement}
 */
const Table = ({data, children, onColumnClick, onRowClick}) => {
	const columns = computeColumns(data);
	const props = {data, columns, onColumnClick, onRowClick};

	return (
		<table>
			<caption>{children}</caption>
			<THead {...props}/>
			<TBody {...props}/>
		</table>
	);
}

Table.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired
}

export default Table;