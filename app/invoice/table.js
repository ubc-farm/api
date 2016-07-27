import React, {Component, PropTypes} from 'react';
import {
	Head, Body, Column,
	generateSortMap
} from '../../lib/table-controls/index.js';
import TotalFooter from './total-footer.js';
import columnList from './invoice-columns.js'
import ActionBar from './action-bar.js';
import {AddRow, DeleteSelected} from 'data-buttons.js';

class InvoiceTable extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		selected: PropTypes.instanceOf(Set),
		onColumnCheckboxChange: PropTypes.func,
		onRowSelect: PropTypes.func,
		onInputChange: PropTypes.func,
		columns: PropTypes.instanceOf(Column)
	}}

	constructor(props) {
		super(props);
		this.onColumnCheckboxChange = this.onColumnCheckboxChange.bind(this);
		this.onColumnClick = this.onColumnClick.bind(this);
		this.onRowSelect = this.onRowSelect.bind(this);
		this.generateSortMap = this.generateSortMap.bind(this);

		this.state = {
			sort: {column: undefined, descending: true}
		};
	}

	generateSortMap() {
		const {column, descending} = this.state.sort;
		if (!column) return;

		return generateSortMap(this.props.data, column, descending);
	}

	render() {
		const {data, selected, columns} = this.props;
		const {sort} = this.state;

		return (
			<table className='invoice-table'>
				<ActionBar selectedLength={this.props.selected.size}>
					<AddRow/>
					<DeleteSelected/>
				</ActionBar>
				<Head columns={columns} sorting={sort}
					selectedLength={selected.size} dataLength={data.size}
					onCheckboxChange={this.props.onColumnCheckboxChange}
					onColumnClick={this.onColumnClick}
				/>
				<Body {...{data, columns, selected}}
					sortMap={this.generateSortMap()}
					onSelect={this.props.onRowSelect}
				/>
				<TotalFooter />
			</table>
		);
	}

	/** Changes table sorting when the user clicks on a column */
	onColumnClick(column) {
		const {column: sortColumn, descending} = this.state.sort;
		if (sortColumn === column) 
			this.setState({sort: {column, descending: !descending}});
		else 
			this.setState({sort: {column, descending: true}});
	}
}

import {connect} from 'react-redux';
import {toggleRowSelection, toggleSelectAll} from './actions.js';

export default connect(
	({data, selected}) => ({
		columns: columnList,
		data, selected
	}),
	dispatch => ({
		onColumnCheckboxChange: () => dispatch(toggleSelectAll()),
		onRowSelect: rowKey => dispatch(toggleRowSelection(rowKey))
	})
)(InvoiceTable);