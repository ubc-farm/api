import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';

import store from './store/index.js';
import InvoiceTable from './table/main.js';
import {domready} from '../ubc-farm-utils/index.js';

domready.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<InvoiceTable />
		</Provider>
	, document.getElementById('invoice-table-node'));
});
