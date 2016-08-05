import {createElement} from 'react';
import {render} from 'react-dom';
import timelineComponent from './timeline/index.js';
import TaskPanel from './drag-drop/panel.js';
import bindListeners from './drag-drop/handler.js';

timelineComponent
.then(Timeline => {
	bindListeners(Timeline);
	window.TimelineComponent = Timeline;
})
.then(() => render(
	createElement(TaskPanel), 
	document.getElementById('tasklist-mount')
))