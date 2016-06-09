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
	propTypes: {
		initialSortColumn: PropTypes.number
	},
	render: function() {
		let rows = [], selectHead, head, headingRow;
		Children.forEach(this.props.children, child => {
			if (child instanceof SelectedTableHeader) selectHead = child;
			else if (child instanceof TableHeader) head = child;
			else if (child instanceof HeaderRow) headingRow = child;
			else rows.push(child);
		})

		let caption = null, thead = null;
		if (head || selectHead) {
			caption = <caption>{head}{selectHead}</caption>;
		}
		if (headingRow) {
			thead = <thead>{headingRow}</thead>;
		}

		return (
			<table>
				{caption}
				{thead}
				<tbody>{rows}</tbody>
			</table>
		);
	}
})

Table.Header = TableHeader;
Table.SelectionHeader = SelectedTableHeader;
Table.ColumnHeading = TableColumn;
Table.Row = TableRow;
Table.Cell = Cell;
Table.HeadingRow = HeaderRow;

export default Table;