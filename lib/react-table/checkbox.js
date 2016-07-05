import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Table from './table.js';

const InterativeTable = connect(
	state => ({
		tableData
	}),
	dispatch => ({
		onRowClick: row => {

		},
		onColumnClick: column => {
			
		}
	})
)(Table);