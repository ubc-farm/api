import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'app/store';
import Sidebar from './sidebar.js';
import Banner from './banner.js';

const App = (
	<div>
		<Sidebar/>
		<Banner/>
		<main className='main'>{children}</main>
	</div>
);

export default App;