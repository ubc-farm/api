import {createElement} from 'react';
import {Column} from '../react-table/index.js';
import {Money} from '../ubc-farm/utils/index.js';

export const name = new Column({columnKey: 'name', compareFunc: true});

export const icon = new Column({
	columnKey: 'icon', 
	title: '',
	compareFunc: true,
	toElement(value) {
		return this.super_toElement(
			createElement('i', {className: 'material-icons'}, value)
		);
	},
	align: 'center'
});

export const role = new Column({columnKey: 'role', compareFunc: true});

export const hourlyPay = new Column({
	columnKey: 'hourlyPay', 
	title: '',
	toElement(cents) {
		let value;
		if (cents !== undefined) value = new Money(cents).toString();
		return this.super_toElement(value);
	},
	compareFunc(a = 0, b = 0) { return b - a; },
	align: 'right'
});

export default [name, icon, role, hourlyPay];