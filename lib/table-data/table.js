import React, {PropTypes, cloneElement as clone} from 'react';
import Column from './column.js';
import Cell from './cell.js';
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
		if (typeof HeaderContent !== 'string')
			return React.createElement(HeaderContent, {
				columnKey, key: columnKey, align, onClick
			});
		else 
			return (
				<Cell header 
					key={columnKey} 
					align={align} 
					onClick={onClick}
				>{HeaderContent}</Cell>
			)
	});

	let rows = [];
	for (let i = 0; i < rowsCount; i++) {
		const onClick = onRowClick ? onRowClick.bind(undefined, i) : undefined;
		rows.push(
			<tr onClick={onClick} 
				className={rowClassNameGetter(i)} 
				key={rowKeyGetter(i)}
			>
				{columns.map(({cell: cellContent, columnKey, align}) => {
					if (typeof cellContent !== 'string')
						return React.createElement(cellContent, {
							rowIndex: i, columnKey, key: columnKey, align
						});
					else	
						return <Cell align={align} key={columnKey}>{cellContent}</Cell>
				})}
			</tr>
		);
	}

	return (
		<table {...omit(props, 
			'columns', 'rowsCount', 'rowClassNameGetter', 'onRowClick')}>
			<thead><tr>{thead}</tr></thead>
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
	rowKeyGetter: rowIndex => rowIndex
}

export default Table;