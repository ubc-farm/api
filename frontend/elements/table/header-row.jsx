import React, { Component, PropTypes, Children } from 'react';
import TableRow from './row.jsx';
import CheckBase from '../form/checkbox.jsx'

export default class HeaderRow extends TableRow {
	handleCheck(e) {
		this.setState({selected: e.target.checked});
	}

	render() {
		let {data, children} = this.props;
		if (children) data = children;
		else if (data instanceof Map) data = data.keys();
		
		return (
			<tr data-selected={this.state.selected} key={data.id}>
				{Array.from(data, key => {
					return <TableColumn>{key}</TableColumn>
				})}
			</tr>
		);
	}

	static get propTypes() {
		return {
			data: PropTypes.oneOfType([
				PropTypes.instanceOf(Map),
				PropTypes.array
			])
		}
	}
}