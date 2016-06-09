import React, { Component, PropTypes, Children } from 'react';

import TableActions from './actions.jsx';
import TableHead from './th.jsx';
import TableRow from './tr.jsx';

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: new Set(),
			sort: {
				column: this.props.initialSortKey,
				dir: 1
			}
		};
	}

	static get propTypes() {
		return {
			initialSortKey: PropTypes.any.isRequired,
			data: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
			mainActions: PropTypes.arrayOf(PropTypes.node),
			altActions: PropTypes.arrayOf(PropTypes.node)
		}
	}

	handleRowSelect(id) {
		if (this.state.selected.has(id)) {
			this.state.selected.delete(id);
		} else {
			this.state.selected.add(id);
		}
	}

	handleHeadingSelect(key) {
		if (this.state.column === key) {
			// Flip the direction if clicking the same column
			this.state.sort = this.state.sort * -1;
		} else {
			this.state.column = key;
		}
	}

	sort() {
		let {column: key, dir} = this.state.sort;
		return this.props.data.sort((aMap, bMap) => {
			let a = aMap.get(key), b = bMap.get(key);
			return a.toString().localeCompare(b) * dir;
		})
	}

	static id(map) {
		return [...map.values()].join();
	}

	render() {
		let {selected, sort} = this.state;
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
				<thead>
					{Array.from(this.props.data[0].keys(), key => {
						let handler = this.handleHeadingSelect.bind(this, key);
						return (
							<TableHead onClick={handler}
							           sort={sort.column === key && sort.dir}>
								{key}
							</TableHead>
						);
					})}
				</thead>
				<tbody>
					{this.sort().map((rowData, index) => {
						let id = Table.id(rowData); 
						let handler = this.handleRowSelect.bind(this, id);
						return (
							<TableRow key={id} selected={selected.has(id)}
							          onClick={handler}/>
						);
					})}
				</tbody>
			</table>
		);
	}
}