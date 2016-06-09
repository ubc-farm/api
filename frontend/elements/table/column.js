import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * A column heading for a table. The heading can be clicked on to change
 * sorting order of the table. If a short name is provided, use it 
 * instead of the name and provide the name as the tooltip for the heading.
 */
export class TableColumn extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.sort !== nextProps.sort
	}

	render() {
		let {name, short, sort} = this.props;
		return (
			<th className={_(
				'table-th', {
					'table-th-sortup': sort === 1,
					'table-th-sortdown': sort === -1
				}
			)} title={short && name}>
				{short || name}
			</th>
		);
	}

	static get propTypes() {
		return {
			name: PropTypes.string.isRequired,
			short: PropTypes.string,
			sort: PropTypes.oneOf([-1, 0, 1])
		}
	}

	static get defaultProps() {
		return {sort: 0}
	}
}