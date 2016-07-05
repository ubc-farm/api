import React, { PropTypes } from 'react';
import THead, {computeColumns} from './head.js';
import TBody from './body.js';

/**
 * Constructs a table from the given data. If a symbol is used as a column
 * heading, then the transformer function will be called so custom table cells
 * can be used.
 * @param {Set<Map<node, node>>} props.data
 * @return {ReactElement}
 */
const Table = (props) => {
	const {children, data, columns} = props;
	if (!columns) columns = computeColumns(data);

	return (
		<table>
			<caption>{children}</caption>
			<THead {...props} columns={columns}/>
			<TBody {...props} columns={columns}/>
		</table>
	);
}

Table.propTypes = {
	data: PropTypes.instanceOf(Set).isRequired,
	columns: PropTypes.instanceOf(Set),
	onColumnClick: PropTypes.func,
	onRowClick: PropTypes.func,
	headerTransformer: PropTypes.func,
	transformer: PropTypes.func
}

Table.defaultProps = {
	onColumnClick: column => {},
	onRowClick: row => {},
	headerTransformer: columnSymbol => <th>{columnSymbol}</th>,
	transformer: (columnSymbol, rowData) => <td>{rowData}</td>
}

export default Table;