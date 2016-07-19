import React, {Children, PropTypes, cloneElement as clone} from 'react';
import Column from './column.js';
import {omit} from '../../lib/utils/index.js';

/**
 * Used to display a table created via callbacks. The children passed to this
 * element define columns and their data. The cell property of the column
 * is called rowsCount times, and is passed the rowIndex and columnKey.
 */
const Table = props => {
	const {children: columns, rowsCount, rowClassNameGetter} = props;
	const {rowKeyGetter, onRowClick, onColumnClick} = props;

	const thead = Children.map(columns, col => {
		const {header, columnKey, align} = col;
		const onClick = onColumnClick.bind(this, columnKey);
		
		let child;
		if (typeof header == 'function' || typeof header == 'object')
			child = clone(header, {columnKey});
		else child = header;

		return (
			<th key={columnKey} className={`align-${align}`}
				onClick={onClick}
			>{child}</th>
		);
	});

	let rows = [];
	for (let i = 0; i < rowsCount; i++) {
		const onClick = onRowClick.bind(this, i);
		rows.push(
			<tr onClick={onClick} 
				className={rowClassNameGetter(i)} 
				key={rowKeyGetter(i) || i}
			>
				{Children.map(columns, ({cell, columnKey, align}) => {
					if (typeof cell !== 'string')
						return clone(cell, {rowIndex: i, columnKey})
					else	
						return <td className={`align-${align}`} key={columnKey}>{cell}</td>
				})}
			</tr>
		);
	}

	return (
		<table {...omit(props, 
			'children', 'rowsCount', 'rowClassNameGetter', 'onRowClick')}>
			<thead>{thead}</thead>
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
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.instanceOf(Column)),
		PropTypes.instanceOf(Column)
	]).isRequired
}

export default Table;