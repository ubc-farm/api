import React, { Component, PropTypes, Children, cloneElement } from 'react';
import _ from '../classnames.js';
import Checkbox from '../form/checkbox.js';

/**
 * Creates a row from the map given
 */
export default function TableRow(props) {
	const handler = callSelect.bind(null, props);

	const cells = Children.map(props.children, child => {
		if (child.type === Checkbox) {
			child = cloneElement(child, {
				checked: props.selected
			})
		}
		return <td>{child}</td>;
	})

	return (
		<tr onClick={handler}
		    className={_('table-row', props.selected && 'table-row-selected')}>
			{cells}
		</tr>
	);
}

TableRow.propTypes = {
	id: PropTypes.string,
	selected: PropTypes.bool,
	//data: PropTypes.instanceOf(Map),
	onSelect: PropTypes.func
}

function callSelect(props) {
	props.onSelect(props.id);
}