import React, { Component, PropTypes, Children } from 'react';

import Checkbox from '../form/checkbox.js';
import TableActions from './actions.js';
import TableHead from './th.js';
import TableRow from './tr.js';

/**
 * Used to render an interactive table from the given Map
 */
export default class Table extends Component {
	constructor(props) {
		super(props);
		this.tableData = props.data.map(row => {
			if (row instanceof Map) return row;
			else return new Map(row);
		})
		this.state = {
			selected: new Set(),
			sortDir: 1,
			sortColumn: this.props.initialSortKey
		};
		this.handleRowSelect = this.handleRowSelect.bind(this);
		this.handleHeadingSelect = this.handleHeadingSelect.bind(this);
		this.sort();
	}

	/**
	 * @memberof Table
	 * @name props
	 * @property {Array<Map|Iterable<K, V>>} data for table, where the keys
	 * correspond to table headings. Either a map or a 
	 * Key, Value iterable can be used as the array children.
	 * @property {any} initialSortKey - corresponds to a key in the table
	 * @property {React.node[]} mainActions
	 * @property {React.node[]} altActions
	 */
	static get propTypes() {
		return {
			initialSortKey: PropTypes.any.isRequired,
			mainActions: PropTypes.arrayOf(PropTypes.node),
			altActions: PropTypes.arrayOf(PropTypes.node),
			data: PropTypes.arrayOf(PropTypes.oneOf(
				PropTypes.instanceOf(Map),
				PropTypes.arrayOf(PropTypes.array)
			)).isRequired,
		}
	}

	/**
	 * Toggle row selection set
	 */
	handleRowSelect(id) {
		this.setState((prevState) => {
			let selected = prevState.selected;
			if (selected.has(id)) {
				selected.delete(id);
			} else {
				selected.add(id);
			}
			return { selected };
		})
	}

	/**
	 * Normally update table sorting based around the selected key.
	 * If a checkbox is selected, select all the rows with that checkbox
	 */
	handleHeadingSelect(key, isCheckbox) {
		if (isCheckbox) {
			// Select all rows if the heading checkbox is clicked
			this.setState((prevState, props) => {
				let selected = prevState.selected;
				for (let rowData in this.tableData) selected.add(Table.id(rowData));
				return { selected };
			});
		} else {
			if (this.state.sortColumn === key) {
				// Flip the direction if clicking the same column
				this.setState(
					(prevState) => ({sortDir: prevState.sortDir * -1}),
					this.sort
				);
			} else {
				this.setState({sortColumn: key}, this.sort);
			}
		}
	}

	/**
	 * Sorts the table data and updates the tableData property, 
	 * then re-renders the table
	 */
	sort() {
		const {sortColumn: key, sortDir: dir} = this.state;
		this.tableData.sort((aMap, bMap) => {
			const a = aMap.get(key), b = bMap.get(key);
			return a.toString().localeCompare(b) * dir;
		});
		this.forceUpdate();
	}

	static id(map) {
		return [...map.values()].join();
	}

	render() {
		const selected = this.state.selected;

		const headings = Array.from(this.tableData[0].keys(), key => {
			const check = key.type === Checkbox;
			const handler = this.handleHeadingSelect.bind(this, key, check)
			
			return (
				<TableHead onClick={handler}
				           sort={this.state.sortColumn === key && this.state.sortDir}>
					{key}
				</TableHead>
			);
		})

		const body = this.tableData.map((rowData, index) => {
			const id = Table.id(rowData); 
			return (
				<TableRow key={id} selected={selected.has(id)}
				          onSelect={this.handleRowSelect}>
					{[...rowData.values()]}
				</TableRow>
			);
		})

		return (
			<table onClick>
				<caption>
					<TableActions count={selected.size}>
						{this.props.mainActions}
					</TableActions>
					<TableActions whenSelected count={selected.size}>
						{this.props.altActions}
					</TableActions>
				</caption>
				<thead>{headings}</thead>
				<tbody>{body}</tbody>
			</table>
		);
	}
}