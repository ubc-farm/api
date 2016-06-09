import React, { Component, PropTypes, Children } from 'react';

import TableHeader from './header.jsx';
import SelectedTableHeader from './select-header.jsx';
import Cell from './column.jsx';
import TableColumn from './column.jsx';
import TableRow from './row.jsx';
import HeaderRow from './header-row.jsx';

var Table = React.createClass({
	getInitialState: function() {
		return {
			sortColumn: this.props.initialSortColumn,
			sortDirection: 1,
			selected: 0
		}
	},
	getDefaultProps: function() {
		return {
			initialSortColumn: 0
		}
	},
	render: function() {
		
		Children.forEach(this.props.children, child => {
			if (child instanceof SelectedTableHeader) var selectHead = child;
			else if (child instanceof TableHeader) var head = child;
		})

		return (
			<table>
				
			</table>
		);
	}
})

Table.Header = TableHeader;
Table.SelectionHeader = SelectedTableHeader;
Table.ColumnHeading = TableColumn;
Table.Row = TableRow;
Table.Cell = Cell;

export default Table;