import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Used for the header of a table.
 */
export default function TableHeader(props) {
	return (
		<div className={_('table-header', props.className)}>
			{this.props.children}
		</div>
	);
}
TableHeader.propTypes = {
	className: PropTypes.string
}