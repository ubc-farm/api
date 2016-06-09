import React, { Component, PropTypes } from 'react';
import {TableCell, Cell} from './cell.jsx'
import {CheckBase} from '../form/checkbox.jsx'

export default class TableRow extends Component {
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
					if (value instanceof TableCell) return value;

					if (value instanceof CheckBase) {
						value.setProps({onChange: this.handleCheck});
					}
					let num = typeof value === 'number';
					return <Cell data-num={num}>{value}</Cell>
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