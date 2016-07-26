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
	getValue(rowData) {
		const cents = this.super_getValue(rowData);
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
	compareFunc(a = 0, b = 0) {return b - a},
	toElement(value) {
		const str = value === undefined? null : value.toString();
		return this.super_toElement(str);
	},
	align: 'right'
}