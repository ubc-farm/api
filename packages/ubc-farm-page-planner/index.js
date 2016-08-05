//import {createElement} from 'react';
import ReactDOM from 'react-dom';
import {domready} from '../ubc-farm-utils/index.js';
//import TaskTile, {Tasks} from './drag-drop/tasklist.js';
import timelineElement from './drag-drop/index.js';

Promise.all([timelineElement, domready]).then(([element]) => {
	ReactDOM.render(element, document.getElementById('app-mount'))
});