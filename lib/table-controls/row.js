import React, {PropTypes} from 'react';
import Cell from './cell.js';
import {classlist as cx} from '../../lib/utils/index.js';

export default class Row {
	constructor(props) {
		this.props = props;

		const {rowKey, onChange, checked, checkPosition} = props;
		if (onChange) this.onChange = () => onChange(rowKey);

		if (checked) this.checkPosition = checkPosition || 'left';
		else this.checkPosition = checkPosition;
	}

	static get propTypes() {return {
		onChange: PropTypes.func,
		checked: PropTypes.bool,
		rowKey: PropTypes.string,
		checkPosition: PropTypes.oneOf(['left', 'right']),
		className: PropTypes.string,
		children: PropTypes.node
	}}

	render() {
		const {className, children, checked} = this.props;
		return (
			<tr onClick={this.onChange} 
				className={cx({'checked': checked}, className)}
			>
				{this.checkPosition === 'left'? this.checkbox() : null}
				{children}
				{this.checkPosition === 'right'? this.checkbox() : null}
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