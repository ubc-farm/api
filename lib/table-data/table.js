import React, {PropTypes} from 'react';
import Column from './column.js';
import Row from './row.js';
import {omit} from '../../lib/utils/index.js';

/**
 * Used to display a table created via callbacks. The children passed to this
 * element define columns and their data. The cell property of the column
 * is called rowsCount times, and is passed the rowIndex and columnKey.
 */
const Table = props => {
	const {columns, rowsCount, rowClassNameGetter} = props;
	const {rowKeyGetter, onRowClick, onColumnClick} = props;

	const thead = columns.map(col => {
		const {header: HeaderContent, columnKey, align} = col;
		const onClick = onColumnClick ? 
			onColumnClick.bind(undefined, columnKey) : undefined; 
		return React.createElement(HeaderContent, {
			columnKey, align, onClick, key: columnKey
		});
	});

	let rows = [];
	for (let i = 0; i < rowsCount; i++) {
		const onClick = onRowClick ? onRowClick.bind(undefined, i) : undefined;
		rows.push(
			<Row onClick={onClick} 
				columns={columns}
				className={rowClassNameGetter(i)}
				key={rowKeyGetter(i)}
				rowIndex={i}
			/>
		);
	}

	return (
		<table {...omit(props, 
			'columns', 'rowsCount', 'rowClassNameGetter', 'onRowClick')}>
			<thead><tr className='table-th-row'>{thead}</tr></thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

Table.propTypes = {
	rowsCount: PropTypes.number.isRequired,
	rowClassNameGetter: PropTypes.func,
	rowKeyGetter: PropTypes.func,
	onRowClick: PropTypes.func,
	onColumnClick: PropTypes.func,
	columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired
}

Table.defaultProps = {
	rowClassNameGetter: rowIndex => undefined,
	rowKeyGetter: rowIndex => `row-${rowIndex}`
}

export default Table;