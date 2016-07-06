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

const InterativeTable = connect(
	(state, {id}) => ({
		data: state.tables[id]
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