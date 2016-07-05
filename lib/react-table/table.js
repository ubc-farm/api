import React, { PropTypes } from 'react';
import THead, {computeColumns} from './head.js';
import TBody from './body.js';

/**
 * Constructs a table from the given data. 
 * @param {Set<Map<node, node>>} props.data
 * @return {ReactElement}
 */
const Table = ({data, children}) => {
	const columns = computeColumns(data);

	return (
		<table>
			<caption>{children}</caption>
			<THead columns={columns}/>
			<TBody columns={columns} data={data}/>
		</table>
	);
}

Table.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired
}

export default Table