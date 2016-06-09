import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Creates a row from the map given
 */
export default function TableRow(props) {
	return (
		<tr className={_('table-row', props.selected && 'table-row-selected')}>
			{Array.from(props.data.entries(), ([key, value]) => {
				return <td>{value}</td>;
			})}
		</tr>
	);
}
TableRow.propTypes = {
	key: PropTypes.string,
	selected: PropTypes.boolean,
	data: PropTypes.instanceOf(Map)
}