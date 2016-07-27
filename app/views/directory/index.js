import React from 'react';
import ReactDOM from 'react-dom';
import {Column, Table, Cell} from '../../../lib/table-controls/index.js';
import Money from '../../../lib/money/index.js';
import {domready} from '../../../lib/utils/index.js';

const columns = [
	new Column({
		columnKey: 'name',
		compareFunc: true
	}),
	new Column({
		columnKey: 'icon',
		title: '',
		compareFunc: true,
		toElement(value, props) {
			return React.createElement(Cell, props, 
				React.createElement('i', {className: 'material-icons'}, value)
			);
		}
	}),
	new Column({
		columnKey: 'role',
		compareFunc: true
	}),
	new Column({
		columnKey: 'hourlyPay',
		toElement(cents, props) {
			let moneyString; 
			if (cents !== undefined) 
				moneyString = new Money(cents).toString();
			return React.createElement(Cell, props, moneyString);
		},
		compareFunc(a = 0, b = 0) {
			return b - a;
		},
		align: 'right'
	})
];

const apiData = fetch('/api/directory')
.then(response => response.json())
.then(json => Object.keys(json).map(k => {
	// apply icons based on roles
	const obj = json[k];
	switch (obj.role) {
		case 'Restaurant': obj.icon = 'restaurant'; break;
		case 'Employee': obj.icon = 'business'; break;
	}
	return obj;
}))
.then(data => {
	let map = new Map();
	for (const key in data) map.set(key, data[key]);
	return map;
});

Promise.all([apiData, domready]).then(([data]) => {ReactDOM.render(
	React.createElement(Table, {data, columns, selection: true, sorting: true}),
	document.getElementById('app-mount')
)});