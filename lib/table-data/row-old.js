import React, {PropTypes} from 'react';
import Column from './column.js'

const Row = ({onClick, className, columns, rowIndex}) => (
	<tr onClick={onClick} className={className}>
		{columns.map(({cell: cellContent, columnKey, align}) => React.createElement(
			cellContent,
			{rowIndex, columnKey, align, key: columnKey}
		))}
	</tr>
)

Row.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
	rowIndex: PropTypes.number.isRequired
}

export default Row;