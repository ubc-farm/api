import Timeline from 'vis-timeline'; //eslint-disable-line 
import {domready} from '../../ubc-farm-utils/index.js';
import timelineOptions from './timeline-options.js';
import getGroups from './groups.js';

export default Promise.all([getGroups, domready])
	.then(([groups]) => new Timeline(
		document.getElementById('app-mount'),
		[],
		groups,
		timelineOptions
	));