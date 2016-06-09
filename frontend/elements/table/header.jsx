import React, { PropTypes } from 'react';

/**
 * Used for the header of a table.
 */
export default function NormalTableHeader(props) {
	return (
		<div className='table-header table-header-main'>
			{this.props.children}
		</div>
	);
}