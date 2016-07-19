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
	const {onRowClick, onColumnClick} = props;

	const thead = Children.map(columns, col => {
		const {header, columnKey, align} = col;
		const onClick = onColumnClick.bind(this, columnKey)
		if (typeof header !== 'string')
			return clone(header, {columnKey, align, onClick});
		else 
			return <th onClick={onClick} className={`align-${align}`}>{header}</th>
	});

	let rows = [];
	for (let i = 0; i < rowsCount; i++) {
		const onClick = onRowClick.bind(this, i);
		rows.push(
			<tr onClick={onClick} className={rowClassNameGetter(i)}>
				{Children.map(columns, ({cell, columnKey, align}) => {
					if (typeof cell !== 'string')
						return clone(cell, {rowIndex: i, columnKey, align})
					else	
						return <td className={`align-${align}`}>{cell}</td>
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
	onRowClick: PropTypes.func,
	onColumnClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.instanceOf(Column)),
		PropTypes.instanceOf(Column)
	]).isRequired
}

export default Table;