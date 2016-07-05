import React from 'react';
import {Provider} from 'react-redux';
import store from 'app/store';
import Sidebar from './sidebar.js';
import Banner from './banner.js';

const reduxApp = (
	<Provider store={store}>
		<div>
			<Sidebar/>
			<Banner/>
			<main className='main'>{children}</main>
		</div>
	</Provider>
);

export default reduxApp;