import React, { PropTypes } from 'react';
import THead, {computeColumns} from './head.js';
import TBody from './body.js';

/**
 * Constructs a table from the given data. If a symbol is used as a column
 * heading, then the transformer function will be called so custom table cells
 * can be used.
 * @param {any} props.id
 * @param {Set<Map<K, node>>} props.data
 * @param {Set<K>} [props.columns]
 * @return {ReactElement}
 */
const Table = (props) => {
	const {children, id, data, columns} = props;
	if (!columns) columns = computeColumns(data);

	return (
		<table key={id}>
			<caption>{children}</caption>
			<THead {...props} columns={columns}/>
			<TBody {...props} columns={columns}/>
		</table>
	);
}

Table.propTypes = {
	id: PropTypes.any.isRequired,
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
	headerTransformer: (columnSymbol, headerRow) => <th>{columnSymbol}</th>,
	transformer: (columnSymbol, cellData, row) => <td>{cellData}</td>
}

export default Table;