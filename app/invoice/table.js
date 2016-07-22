import React, {Component, PropTypes} from 'react';
import {Head, Body, generateSortMap} from '../../lib/table-controls/index.js';
import invoiceColumns from './table-columns.js';

export default class InvoiceTable extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		selected: PropTypes.instanceOf(Set),
		onDataChange: PropTypes.func,
		onSelectionChange: PropTypes.func
	}}

	constructor(props) {
		super(props);
		this.onColumnCheckboxChange = this.onColumnCheckboxChange.bind(this);
		this.onColumnClick = this.onColumnClick.bind(this);
		this.onRowSelect = this.onRowSelect.bind(this);
		this.generateSortMap = this.generateSortMap.bind(this);

		this.state = {
			sort: {
				columnKey: undefined,
				descending: true
			},
			columns: invoiceColumns(this.onInputChange.bind(this))
		}
	}

	generateSortMap() {
		const {columnKey, descending} = this.state.sort;
		if (!columnKey) return;

		const {data} = this.props;
		const sortColumn = this.state.columns.find(c => c.columnKey === columnKey);
		return generateSortMap(data, sortColumn, descending);
	}

	render() {
		const {data, selected} = this.props;
		const {columns, sort} = this.state;

		return (
			<table>
				<Head columns={columns} sorting={sort}
					selectedLength={selected.size} dataLength={data.size}
					onCheckboxChange={this.onColumnCheckboxChange}
					onColumnClick={this.onColumnClick}
				/>
				<Body {...{data, columns, selected}}
					sortMap={this.generateSortMap()}
					onSelect={this.onRowSelect}
				/>
			</table>
		)
	}

	onColumnClick(columnKey) {
		const {columnKey: sortKey, descending} = this.state.sort;
		if (sortKey === columnKey) 
			this.setState({sort: {columnKey, descending: !descending}});
		else 
			this.setState({sort: {columnKey, descending: true}});
	}

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
	onColumnCheckboxChange() {
		const {selected, data, onSelectionChange} = this.props;
		if (selected.size === data.size)
			return onSelectionChange(new Set());
		else
			return onSelectionChange(new Set(data.keys()));
	}

	onInputChange(event, rowKey, columnKey) {
		const data = new Map(this.props.data);
		let rowData = data.get(rowKey);
		
		rowData = Object.assign({}, rowData, {
			[columnKey]: event.target.value
		});
		data.set(rowKey, rowData);
		return this.props.onDataChange(data);
	}
}