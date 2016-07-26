import React, {Component, PropTypes} from 'react';
import {Head, Body, generateSortMap} from '../../lib/table-controls/index.js';
import invoiceColumns from './invoice-columns-renderer.js';
import TotalFooter from './totals.js';

export default class InvoiceTable extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		selected: PropTypes.instanceOf(Set),
		onDataChange: PropTypes.func,
		onSelectionChange: PropTypes.func,
		totalsProps: PropTypes.object
	}}

	constructor(props) {
		super(props);
		this.onColumnCheckboxChange = this.onColumnCheckboxChange.bind(this);
		this.onColumnClick = this.onColumnClick.bind(this);
		this.onRowSelect = this.onRowSelect.bind(this);
		this.generateSortMap = this.generateSortMap.bind(this);

		this.state = {
			sort: {column: undefined, descending: true},
			columns: invoiceColumns(this.onInputChange.bind(this))
		};
	}

	generateSortMap() {
		const {column, descending} = this.state.sort;
		if (!column) return;

		return generateSortMap(this.props.data, column, descending);
	}

	render() {
		const {data, selected} = this.props;
		const {columns, sort} = this.state;

		return (
			<table className='invoice-table'>
				<Head columns={columns} sorting={sort}
					selectedLength={selected.size} dataLength={data.size}
					onCheckboxChange={this.onColumnCheckboxChange}
					onColumnClick={this.onColumnClick}
				/>
				<Body {...{data, columns, selected}}
					sortMap={this.generateSortMap()}
					onSelect={this.onRowSelect}
				/>
				<TotalFooter {...this.props.totalsProps} 
					data={data} columns={columns}
				/>
			</table>
		)
	}

	/** Changes table sorting when the user clicks on a column */
	onColumnClick(column) {
		const {column: sortColumn, descending} = this.state.sort;
		if (sortColumn === column) 
			this.setState({sort: {column, descending: !descending}});
		else 
			this.setState({sort: {column, descending: true}});
	}

	/** @todo move to redux */
	onRowSelect(rowKey) {
		const {onSelectionChange} = this.props;
		const selected = new Set(this.props.selected);
		if (!selected.has(rowKey)) 
			return onSelectionChange(selected.add(rowKey))
		else {
			selected.delete(rowKey);
			return onSelectionChange(selected);
		}
	}
	/** @todo move to redux */
	onColumnCheckboxChange() {
		const {selected, data, onSelectionChange} = this.props;
		if (selected.size === data.size)
			return onSelectionChange(new Set());
		else
			return onSelectionChange(new Set(data.keys()));
	}
	/** @todo move to redux */
	onInputChange(event, rowKey, column) {
		const data = new Map(this.props.data);
		let rowData = data.get(rowKey);

		///TODO immutable
		rowData.set(column, event.target.value);
		
		data.set(rowKey, rowData);
		return this.props.onDataChange(data);
	}
}