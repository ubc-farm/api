import React, { Component } from 'react';

/**
 * Parent component for Cells in a table. Other cells will inherit from this.
 */
export default function Cell(props) {
	return <td/>
}

export class TableCell extends Component {
	render() {
		return <Cell/>
	}
}