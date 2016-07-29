import React from 'react';
import {Money} from '../ubc-farm-utils/index.js';
import {Column} from '../react-table/index.js';

import StaticInput from './small-components/input-static-placeholder.js';
import InvoiceInput, {OnBlur} from './small-components/invoice-input.js';
import {moneyTransformer} from './store/calculate-money.js';

export const item = new Column({
	columnKey: 'item',
	compareFunc: true,
	toElement(value, rowKey) {
		const props = Object.assign({},this.toJSON(), {header: true, scope: 'row'});
		return this.super_toElement(
			<InvoiceInput spellCheck
				placeholder='Squash, kg'
				rowKey={rowKey} column={this}
			/>
		, rowKey, props);
	}
})

export const description = new Column({
	columnKey: 'description',
	compareFunc: true,
	toElement(value, rowKey) {
		const random1to10 = Math.ceil(Math.random() * 10);
		return this.super_toElement(
			<InvoiceInput spellCheck
				placeholder={`Squash variety ${random1to10}, kg`}
				rowKey={rowKey} column={this}
			/>
		);
	}
});

export const unitCost = new Column({
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
	align: 'right',
	toElement(value, rowKey) {
		const randomMoney = new Money(Math.trunc(Math.random() * 50000)).toString();

		return this.super_toElement(
			<OnBlur
				transformerOut={moneyTransformer}
				rowKey={rowKey} column={this}
			>
				<StaticInput
					style={{maxWidth: '5em'}}
					placeholder={randomMoney}
				/>
			</OnBlur>
		);
	}
})

export const quantity = new Column({
	columnKey: 'quantity',
	compareFunc: true,
	align: 'right',
	toElement(value, rowKey) {
		return this.super_toElement(
			<InvoiceInput type='number' step='any'
				style={{maxWidth: '5em'}}
				placeholder={Math.trunc(Math.random() * 100)}
				rowKey={rowKey} column={this}
			/>
		);
	}
})

export const price = new Column({
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
})

export default [item, description, unitCost, quantity, price];