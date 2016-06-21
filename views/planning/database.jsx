import React, { Component, PropTypes } from 'react';
import Shell from '../_layouts/shell.js';
import IconButton from '../_components/icon/button.js';
import Table from '../_components/table';

const fakeData = [
	[
		[],
		[]
	]
]

export default class ItemsPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		<Shell
			active='Planning'
			banner={
				<IconButton>Add</IconButton>
			}>
			<Table data={fakeData} initialSortKey={fakeData[0][0]}/>
			<Filter/>
		</Shell>
	}
}