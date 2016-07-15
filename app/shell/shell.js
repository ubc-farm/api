import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar.js';
import Banner from './banner.js';

const App = ({children}) => (
	<div>
		<Sidebar/>
		<Banner/>
		<main className='main'>{children}</main>
	</div>
);

App.propTypes = {
	children: PropTypes.node
}

export default App;