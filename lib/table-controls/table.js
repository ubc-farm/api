import React, {Component, PropTypes} from 'react';
import Body, {Head, Column} from './index.js';

/**
 * Example table that uses the table-controls components.
 */
export default class Table extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)),
		sorting: PropTypes.bool,
		selection: PropTypes.bool
	}}

	constructor(props) {
		super(props);

		const {sorting, selection} = props;
		let state = {};
		if (selection) state.selected = new Set();
		if (sorting) state.sort = {columnKey: undefined, descending: true};
		this.state = state;

		this.onRowSelect = selection ? this.onRowSelect.bind(this) : undefined;
		this.onColumnCheckboxChange = selection ? 
			this.onColumnCheckboxChange.bind(this) : undefined;
		this.onColumnClick = sorting ? this.onColumnClick.bind(this) : undefined;
	}

	generateSortMap() {
		const {sort} = this.state; 
		if (!sort) return;
		const {columnKey, descending} = sort; 
		if (!columnKey) return;
		
		const {data} = this.props;
		const sortColumn = this.props.columns.find(c => c.columnKey === columnKey);

		const columnData = Array.from(data,
			([rowKey, rowData]) => [rowKey, sortColumn.getValue(rowData, columnKey)]);
		
		const sortedData = columnData.sort(([, a], [, b]) => 
			sortColumn.compareFunc(a, b))

		if (!descending) sortedData.reverse();

		return new Map(sortedData.map(([rowKey], index) => [index, rowKey]));
	}

	render() {
		const {data, columns} = this.props;
		const {selected, sort} = this.state;

		return (
			<table>
				<caption style={{visibility: selected.length > 0? 'visible':'hidden'}}>
					{selected.length}
					{`item${selected.length > 1 ? 's' : ''}`}
					{'selected'}
				</caption>
				<Head columns={columns}
					selectedLength={selected ? selected.size : undefined}
					dataLength={data.size}
					sorting={sort}
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

	onRowSelect(rowKey) {
		const selected = new Set(this.state.selected);
		if (!selected.has(rowKey)) selected.add(rowKey);
		else selected.delete(rowKey);
		this.setState({selected});
	}
	onColumnCheckboxChange() {
		const {data} = this.props;
		const {selected} = this.state;
		if (selected.size === data.size) this.setState({selected: new Set()});
		else this.setState({selected: new Set(data.keys())})
	}
	onColumnClick(columnKey) {
		const {columnKey: sortKey, descending} = this.state.sort;
		if (sortKey === columnKey) 
			this.setState({sort: {columnKey, descending: !descending}});
		else 
			this.setState({sort: {columnKey, descending: true}});
	}
}