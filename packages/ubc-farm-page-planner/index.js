import TaskTile, {Tasks} from './drag-drop/tasklist.js';
import {domready} from '../ubc-farm-utils/index.js';
import {createElement} from 'react';
import ReactDOM from 'react-dom';

domready.then(() => {
	ReactDOM.render(
		createElement('div', {}, 
			Array.from(Tasks, ([name, color]) => 
				createElement(TaskTile, {color, name}))
		),
		document.getElementById('app-mount')
	);
})