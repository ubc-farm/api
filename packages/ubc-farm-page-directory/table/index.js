import {createElement} from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import {domready} from '../../ubc-farm-utils/index.js';
import {Table} from '../../react-table/index.js';
import apiData from './get-api.js';
import columns from './columnlist.js';

Promise.all([apiData, domready]).then(([data]) => {
	ReactDOM.render(
		<Table selection sorting data={data} columns={columns} />,
		document.getElementById('app-mount')
	);
})