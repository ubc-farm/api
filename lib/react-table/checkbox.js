import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Table from './table.js';

export const CHECKBOX = Symbol('Checkbox component');

/**
 * @param {Set<Map>} dataSet
 * @returns {Set<Map>} copy of dataSet, where each map row has the 
 * CHECKBOX symbol at the beginning of the map
 */
function addCheckboxes(dataSet) {
	let data = new Set();
	for (let row in dataSet) 
		data.add( new Map([[CHECKBOX, CHECKBOX], ...row]) );
	return data;
}

const InterativeTable = connect(
	state => ({
		data: state.tables[ID]
	}),
	dispatch => ({
		onRowClick: row => {

		},
		onColumnClick: column => {
			
		}
	})
)(Table);