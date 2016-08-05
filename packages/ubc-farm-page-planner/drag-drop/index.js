import {createElement as h} from 'react'; /** @jsx h */
import Timeline from 'vis-timeline'; //eslint-disable-line 
import timelineOptions from './timeline-options.js';
import getGroups from './groups.js';

export default getGroups.then(groups => (
	<Timeline 
		options={timelineOptions}
		groups={groups}
	/>
));