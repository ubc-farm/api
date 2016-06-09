import React, { Component, PropTypes } from 'react';
import {Radio, Checkbox} from '../form/checkbox.jsx'

export class TableRow extends Component {
	constructor(props) {
		super(props);
		this.state = {selected: false};
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleCheck(e) {
		this.setState({selected: e.target.checked});
	}

	render() {
		let {data} = this.props;
		return (
			<tr data-selected={this.state.selected} key={data.id}>
				{data.forEach((value, key) => {
					if (typeof value === 'object' && value.type) {
						let type = value.type; delete value.type;
						if (type === 'checkbox') {
							return <td><Checkbox {...value} onChange={this.handleCheck}/></td>
						} else if (type === 'radio') {
							return <td><Radio {...value} onChange={this.handleCheck}/></td>
						}
					} 
					let num = typeof value === 'number';
					return <td data-num={num}>{value}</td>
				})}
			</tr>
		);
	}

	static get propTypes() {
		return {
			data: PropTypes.instanceOf(Map)
		}
	}
}