import {createElement} from 'react';
import {Column, Cell} from '../../lib/table-controls/index.js';
import Money from '../../lib/money/index.js';

export const item = new Column({
	columnKey: 'item',
	compareFunc: true,
	type: 'text',
	spellCheck: true,
	placeholder: 'Squash, kg'
});

export const description = new Column({
	columnKey: 'description',
	compareFunc: true,
	type: 'text',
	spellCheck: true,
	placeholder: 'Squash variety 2, kg'
})

export const unitCost = new Column({
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
	placeholder: '',
	align: 'right',
	type: 'number',
	step: 0.01
})

export const quantity = new Column({
	columnKey: 'quantity',
	compareFunc: true,
	align: 'right',
	type: 'number',
	step: 'any'
})

export const price = new Column({
	columnKey: 'price',
	title: 'Price ($)',
	getValue(rowData) {
		const total = rowData.unitCost * rowData.quantity;
		if (!Money.isNaN(total)) return new Money(total);
	},
	compareFunc(a = 0, b = 0) {
		return b - a;
	},
	toElement(money, props) {
		const moneyString = money !== undefined ? 
			money.toString() : undefined; 
		return createElement(Cell, props, moneyString);
	},
	align: 'right'
})

export default [item, description, unitCost, quantity, price];