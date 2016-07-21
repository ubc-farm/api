import React, {Component, PropTypes} from 'react';
import Cell from './cell.js';
import {classlist as cx} from '../../lib/utils/index.js';

export default class Row extends Component {
	constructor(props) {
		super(props);

		const {rowKey, onChange} = props;
		if (onChange) this.onChange = () => onChange(rowKey);
	}

	static get propTypes() {return {
		onChange: PropTypes.func,
		checked: PropTypes.bool,
		rowKey: PropTypes.string,
		showCheckbox: PropTypes.bool,
		className: PropTypes.string,
		children: PropTypes.node
	}}

	render() {
		const {className, children, checked, showCheckbox} = this.props;
		return (
			<tr onClick={this.onChange} 
				className={cx({'checked': checked}, className)}
			>
				{showCheckbox? this.checkbox() : null}
				{children}
			</tr>
		);
	}

	checkbox() {
		const {checked} = this.props;
		return (
			<Cell align='center'>
				<input type='checkbox' checked={checked} onChange={this.onChange}/>
			</Cell>
		);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps !== this.props;
	}
}