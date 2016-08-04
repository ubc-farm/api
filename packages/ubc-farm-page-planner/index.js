import {createElement} from 'react';
import ReactDOM from 'react-dom';
import {domready} from '../ubc-farm-utils/index.js';
import TaskTile, {Tasks} from './drag-drop/tasklist.js';

domready.then(() => {
	ReactDOM.render(
		createElement('div', {}, 
			Array.from(Tasks, ([name, color]) => 
				createElement(TaskTile, {color, name}))
		),
		document.getElementById('app-mount')
	);
})