import React from 'react';
import ReactDOM from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import store from 'app/store';
import App from 'app/shell';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}><Router history={history}>
		<Route path='/' component={App}>

		</Route>
	</Router></Provider>
)