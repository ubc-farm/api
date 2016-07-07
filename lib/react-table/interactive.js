import React, { PropTypes, cloneElement } from 'react';
import {connect} from 'react-redux';
import Table from './table.js';

export const CHECKBOX = Symbol('Checkbox component');

/**
 * @param {Set<Map>} dataSet
 * @returns {Set<Map>} copy of dataSet, where each map row has the 
 * CHECKBOX symbol at the beginning of the map
 */
export function addCheckboxes(dataSet) {
	let data = new Set();
	for (let row in dataSet) 
		data.add( new Map([[CHECKBOX, false], ...row]) );
	return data;
}

/**
 * Filters a set based on the provided indexes
 * @param {Set} tableState.data - table data
 * @param {number} tableState.startIndex - data after and including this index
 * @param {number} tableState.endIndex - data before and excluding this index
 * @returns {Set}
 */
function filterSet(tableState) {
	const {data} = tableState;
	const {startIndex = 0, endIndex = data.size} = tableState;
	
	if (startIndex === 0 && endIndex === data.size) return data; 

	let clone = new Set(), i = 0;
	for (let value of data) {
		if (i >= startIndex && i < endIndex) clone.add(value);
		i++;
	}
	return clone;
} 

const InterativeTable = connect(
	(state, {id}) => ({
		data: filterSet(state.tables[id])
	}),
	(dispatch, {id}) => ({
		onRowClick: row => {

		},
		onColumnClick: column => {
			dispatch(sortTable(id, column));
		}
	}),
	(stateProps, dispatchProps, ownProps) => Object.assign(
		{}, ownProps, stateProps, dispatchProps, {
			transformer: (columnSymbol, checkedState) => {
				if (columnSymbol === CHECKBOX) {
					return <Checkbox checked={checkedState}/>
				}
			}
		}
	)
)(Table);

export default InterativeTable;