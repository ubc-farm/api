import {createElement} from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'vis-timeline'; //eslint-disable-line 
import {domready} from '../ubc-farm-utils/index.js';
//import TaskTile, {Tasks} from './drag-drop/tasklist.js';

domready.then(() => {
	ReactDOM.render(
		/*createElement('div', {}, 
			Array.from(Tasks, ([name, color]) => 
				createElement(TaskTile, {color, name}))
		),*/
		createElement(Timeline, {
			options: {
				editable: true,
				min: new Date(new Date().getFullYear() - 1, 0),
				max: new Date(new Date().getFullYear() + 2, 0, 0)
			}
		}),
		document.getElementById('app-mount')
	);
})