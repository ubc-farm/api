import React, { Component, PropTypes, Children, cloneElement } from 'react';
import _ from '../classnames.js';
import Checkbox from '../form/checkbox.js';

/**
 * Creates a row from the map given
 */
export default function TableRow(props) {
	let handler = this.callSelect.bind(this, props);
	return (
		<tr onClick={handler}
		    className={_('table-row', props.selected && 'table-row-selected')}>
			{this.renderCells(this.props)}
		</tr>
	);
}

TableRow.propTypes = {
	key: PropTypes.string,
	selected: PropTypes.boolean,
	//data: PropTypes.instanceOf(Map),
	onSelect: PropTypes.func
}

function renderCells(props) {
	return Children.map(props.children, child => {
		if (child.type === Checkbox) {
			child = cloneElement(child, {
				checked: props.selected
			})
		}
		return <td>{child}</td>;
	})
	/*return Array.from(props.data.entries(), ([, cellNode]) => {
		if (cellNode.type === Checkbox) {
			cellNode = React.cloneElement(cellNode, {
				checked: props.selected
			})
		} 

		return <td>{cellNode}</td>;
	});*/
}

function callSelect(props) {
	props.onSelect(props.key);
}