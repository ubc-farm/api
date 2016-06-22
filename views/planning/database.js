import React, { Component, PropTypes } from 'react';
import Shell from '../_layouts/shell.js';
import IconButton from '../_components/icon/button.js';
import Table from '../_components/table';

const fakeData = [
	[
		['Name', 'Apple'],
		['SKU', '']
		['Barcode', 12345689]
		['Supplier', 'Some Company Ltd']
		['Lifespan', '2 years']
		['Value', '$0.99']
		['Salvage Value', '$0.98']
	],
	[
		['Name', 'Cookie'],
		['SKU', '']
		['Barcode', 12345689]
		['Supplier', 'Some Company Ltd']
		['Lifespan', '2 years']
		['Value', '$0.99']
		['Salvage Value', '$0.98']
	],
	[
		['Name', 'Object'],
		['SKU', '']
		['Barcode', 12345689]
		['Supplier', 'Some Company Ltd']
		['Lifespan', '2 years']
		['Value', '$0.99']
		['Salvage Value', '$0.98']
	],
	[
		['Name', 'Thing'],
		['SKU', '']
		['Barcode', 12345689]
		['Supplier', 'Some Company Ltd']
		['Lifespan', '2 years']
		['Value', '$0.99']
		['Salvage Value', '$0.98']
	]
]

export default class InventoryScreen extends Component {
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
			{/*<Filter/>*/}
		</Shell>
	}
}