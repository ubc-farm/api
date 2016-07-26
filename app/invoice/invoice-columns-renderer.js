import React from 'react';
import Money from '../../lib/money/index.js';
import {Column} from '../../lib/table-controls/index.js';
import {
	item, description, unitCost, quantity, price
} from './invoice-columns.js';
import InvoiceInput, {UpdateOnBlur} from './input-cell.js';

/** @returns {Column} copy of object with the specified extra properties */
const clone = (from, ...extra) => new Column(Object.assign({}, from, ...extra))

export default function invoiceColumns(onChangeCallback) {
	function getOnChange(rowKey, column) {
		return e => {
			e.stopPropagation();
			onChangeCallback(e, rowKey, column);
		}
	}

	return [
		clone(item, { toElement(value, rowKey) {
			const props = Object.assign({}, 
				this.toJSON(), {header: true,	scope: 'row'}
			);

			return this.super_createElement(
				<InvoiceInput spellCheck
					onChange={getOnChange(rowKey, item)}
					placeholder='Squash, kg'
					value={value}
				/>
			, rowKey, props);
		}}),
		clone(description, { toElement(value, props, rowKey) {
			return this.super_createElement(
				<InvoiceInput spellCheck
					onChange={getOnChange(rowKey, description)}
					placeholder='Squash variety 2, kg'
					value={value}
				/>
			);
		}}),
		clone(unitCost, { toElement(value, rowKey) {
			const onBlur = value => {
				const stripedNonNumbers = value.replace(/[^0-9\.]/g, '');
				const money = new Money(stripedNonNumbers, {convert: false});
				onChangeCallback({target: {value: money}}, rowKey, unitCost.columnKey);
			};

			const randomAmount = Math.trunc(Math.random() * 50000);
			const randomMoneyString = new Money(randomAmount).toString();

			return this.super_createElement(
				<UpdateOnBlur
					value={value !== undefined ? value.toString() : ''}
					style={{maxWidth: '5em'}}
					onBlur={onBlur}
					placeholder={randomMoneyString}
				/>
			);
		}}),
		clone(quantity, { toElement(value, props, rowKey) {
			return this.super_createElement(
				<InvoiceInput step='any'
					onChange={getOnChange(rowKey, quantity)}
					type='number' value={value}
					style={{maxWidth: '5em'}}
					placeholder={Math.trunc(Math.random() * 100)}
				/>
			);
		}}),
		clone(price)
	];
}