import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * List of buttons and actions related to the table, that displayes
 * as a header for the table.
 */
export default function TableActions(props) {
	const {count, whenSelected} = props;

	const counter = whenSelected 
		&& <span>{count} item{count !== 1 && 's'} selected</span>;
	
	return (
		<div hidden={(count === 0) !== whenSelected} className={_(
			'table-actions', {'table-actions-select': whenSelected}
		)}>
			{counter}
			{props.children}
		</div>
	);
}
TableActions.propTypes = {
	count: PropTypes.number,
	whenSelected: PropTypes.bool
}