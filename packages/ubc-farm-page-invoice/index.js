import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';

import store from './store/index.js';
import InvoiceTable from './table/main.js';

ReactDOM.render(
	<Provider store={store}>
		<InvoiceTable />
	</Provider>
)