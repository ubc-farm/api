import Overview from './month-overview/connected.js';
import store from './redux/store.js';
//import DatePicker from './date-picker/container.js';
import {domready} from '../ubc-farm-utils/index.js';
import {createElement} from 'react';
import ReactDOM from 'react-dom';

domready.then(() => {
	ReactDOM.render(
		createElement(Overview, {store}),
		document.getElementById('app-mount')
	);
})