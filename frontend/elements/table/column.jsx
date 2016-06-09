import React, { PropTypes } from 'react';
import {TableCell} from './cell.jsx'
import _ from '../classnames.js';

/**
 * A column heading for a table. The heading can be clicked on to change
 * sorting order of the table. If a short name is provided, use it 
 * instead of the name and provide the name as the tooltip for the heading.
 */
export default class TableColumn extends TableCell {
	shouldComponentUpdate(nextProps) {
		return this.props.sort !== nextProps.sort
	}

	render() {
		let {name, short, sort, children: child} = this.props;
		return (
			<th className={_(
				'table-th', {
					'table-th-sortup': sort === 1,
					'table-th-sortdown': sort === -1
				}
			)} title={short && (name || child)}>
				{child || short || name}
			</th>
		);
	}

	static get propTypes() {
		return {
			name: PropTypes.string.isRequired,
			short: PropTypes.string,
			sort: PropTypes.oneOf([-1, 0, 1]),
			children: PropTypes.element
		}
	}

	static get defaultProps() {
		return {sort: 0}
	}
}