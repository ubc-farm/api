import React from 'react';
import {Column, Cell} from '../../lib/table-controls/index.js';
import Money from '../../lib/money/index.js';

export const item = {
	columnKey: 'item',
	compareFunc: true
}

export const description = {
	columnKey: 'description',
	compareFunc: true
}

export const unitCost = {
	columnKey: 'unitCost',
	title: 'Unit Cost ($)',
	description: 'Cost per unit of this item',
	getValue(rowData, columnKey) {
		const cents = rowData[columnKey];
		if (cents !== undefined) return new Money(cents);
	},
	compareFunc(a = 0, b = 0) {
		return b - a;
	},
	align: 'right'
}

export const quantity = {
	columnKey: 'quantity',
	compareFunc: true,
	align: 'right',
	type: 'number',
	step: 'any'
}

export const price = {
	columnKey: 'price',
	title: 'Price ($)',
	getValue(rowData) {
		const total = rowData.unitCost * rowData.quantity;
		if (!Money.isNaN(total)) return new Money(total);
	},
	compareFunc(a = 0, b = 0) {
		return b - a;
	},
	toElement(value, props) {
		return <Cell {...props}>{value.toString()}</Cell>
	},
	align: 'right'
}

/** @returns {Column} copy of object with the specified extra properties */
const clone = (from, ...extra) => new Column(Object.assign({}, from, ...extra))

export default function invoiceColumns(onChangeCallback) {
	function getOnChange(rowKey, column) {
		return e => {
			e.stopPropagation();
			onChangeCallback(e, rowKey, column.columnKey);
		}
	}

	const stop = e => e.stopPropagation();

	return [
		clone(item, { toElement(value, props, rowKey) {
			const onChange = getOnChange(rowKey, item);
			return (
				<Cell {...props} header scope='row'>
					<input type='text' spellCheck
						placeholder='Squash, kg'
						value={value}
						onChange={onChange}
						onClick={stop}
						className='input-plain invoice-table-input'
					/>
				</Cell>
			);
		}}),
		clone(description, { toElement(value, props, rowKey) {
			const onChange = getOnChange(rowKey, description);
			return (
				<Cell {...props}>
					<input type='text' spellCheck
						placeholder='Squash variety 2, kg'
						value={value}
						onChange={onChange}
						onClick={stop}
						className='input-plain invoice-table-input'
					/>
				</Cell>
			);
		}}),
		clone(unitCost, { toElement(value, props, rowKey) {
			const onChange = e => {
				e.stopPropagation();
				let fakeEvent = {target: {value: undefined}}; 
				fakeEvent.target.value = new Money(e.target.value, {convert: false});
				onChangeCallback(fakeEvent, rowKey, unitCost.columnKey);
			}
			return (
				<Cell {...props}>
					<input type='number' 
						placeholder='2.99'
						value={value.toString({dollarSign: false, useMinusSign: true})}
						onChange={onChange}
						step={0.01}
						onClick={stop}
						className='input-plain invoice-table-input'
						style={{maxWidth: '5em'}}
					/>
				</Cell>
			);
		}}),
		clone(quantity, { toElement(value, props, rowKey) {
			const onChange = getOnChange(rowKey, quantity);
			return (
				<Cell {...props}>
					<input type='number' 
						placeholder='25'
						value={value}
						onChange={onChange}
						step="any"
						onClick={stop}
						className='input-plain invoice-table-input'
						style={{maxWidth: '5em'}}
					/>
				</Cell>
			);
		}}),
		clone(price)
	];
}