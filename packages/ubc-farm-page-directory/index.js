import apiData from './get-api.js';
import columns from './columnlist.js';
import {domready} from '../ubc-farm-utils/index.js';
import {Table} from '../react-table/index.js';
import {createElement} from 'react';
import ReactDOM from 'react-dom';

Promise.all([apiData, domready]).then(([data]) => {
	ReactDOM.render(
		createElement(Table, {data, columns, selection: true, sorting: true}),
		document.getElementById('app-mount')
	);
})