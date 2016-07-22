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
	align: 'right'
}

/** @returns {Column} copy of object with the specified extra properties */
const clone = (from, ...extra) => new Column(Object.assign({}, from, ...extra))

export default function invoiceColumns(onChangeCallback) {
	return [
		clone(item, { toElement(value, props, rowKey) {
			const onChange = e => onChangeCallback(e, rowKey, item.columnKey);
			return (
				<Cell {...props} header scope='row'>
					<input type='text' spellCheck
						placeholder='Squash, kg'
						value={value}
						onChange={onChange}
					/>
				</Cell>
			);
		}}),
		clone(description, { toElement(value, props, rowKey) {
			const onChange = e => onChangeCallback(e, rowKey, description.columnKey);
			return (
				<Cell {...props}>
					<input type='text' spellCheck
						placeholder='Squash variety 2, kg'
						value={value}
						onChange={onChange}
					/>
				</Cell>
			);
		}}),
		clone(unitCost, { toElement(value, props, rowKey) {
			const onChange = e => onChangeCallback(e, rowKey, unitCost.columnKey);
			return (
				<Cell {...props}>
					<input type='number' 
						placeholder='2.99'
						value={value}
						onChange={onChange}
						step={0.01}
					/>
				</Cell>
			);
		}}),
		clone(quantity, { toElement(value, props, rowKey) {
			const onChange = e => onChangeCallback(e, rowKey, quantity.columnKey);
			return (
				<Cell {...props}>
					<input type='number' 
						placeholder='2.99'
						value={value}
						onChange={onChange}
						step={0.01}
					/>
				</Cell>
			);
		}}),
		clone(price)
	];
}