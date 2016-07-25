import React from 'react';
import Money from '../../lib/money/index.js';
import {Column} from '../../lib/table-controls/index.js';
import {
	item, description, unitCost, quantity, price
} from './invoice-columns.js';
import InputCell, {UpdateOnBlur} from './input-cell.js';

/** @returns {Column} copy of object with the specified extra properties */
const clone = (from, ...extra) => new Column(Object.assign({}, from, ...extra))

export default function invoiceColumns(onChangeCallback) {
	function getOnChange(rowKey, column) {
		return e => {
			e.stopPropagation();
			onChangeCallback(e, rowKey, column.columnKey);
		}
	}

	return [
		clone(item, { toElement(value, props, rowKey) {
			return (
				<InputCell
					cellProps={Object.assign({}, props, {header: true, scope: 'row'})}
					key={props.key}
					inputProps={{
						spellCheck: true,
						onChange: getOnChange(rowKey, item),
						placeholder: 'Squash, kg'
					}}
					value={value}
				/>
			);
		}}),
		clone(description, { toElement(value, props, rowKey) {
			return (
				<InputCell
					cellProps={props}
					key={props.key}
					inputProps={{
						spellCheck: true,
						onChange: getOnChange(rowKey, description),
						placeholder: 'Squash variety 2, kg'
					}}
					value={value}
				/>
			);
		}}),
		clone(unitCost, { toElement(value, props, rowKey) {
			const onBlur = value => {
				const stripedNonNumbers = value.replace(/[^0-9\.]/g, '');
				const money = new Money(stripedNonNumbers, {convert: false});
				onChangeCallback({target: {value: money}}, rowKey, unitCost.columnKey);
			}

			return (
				<UpdateOnBlur
					cellProps={props}
					key={props.key}
					value={value !== undefined ? value.toString() : ''}
					inputProps={{
						placeholder: '$2.99',
						style: {maxWidth: '5em'}
					}}
					onBlur={onBlur}
				/>
			);
		}}),
		clone(quantity, { toElement(value, props, rowKey) {
			return (
				<InputCell
					cellProps={props}
					key={props.key}
					inputProps={{
						onChange: getOnChange(rowKey, quantity),
						placeholder: '25',
						step: 'any',
						style: {maxWidth: '5em'},
						type: 'number'
					}}
					value={value}
				/>
			);
		}}),
		clone(price)
	];
}