import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Column headings for the table.
 */
export default function TableHead(props) {
	return (
		<th className={_(
			'table-th', {
				'table-th-sortup': sort === 1,
				'table-th-sortdown': sort === -1
			}
		)}>
			{props.children}
		</th>
	);
}
TableHead.propTypes = {
	sort: PropTypes.oneOf([-1, 0, 1])
}