import React, { PropTypes } from 'react';
import _ from '../classnames.js';

export default function LoadingIndicator(props) {
	return (
		<div className={_('folding-cube', props.className)} 
		     aria-role='progressbar' hidden={props.hidden}>
			<div className='f-cube1 f-cube'/>
			<div className='f-cube2 f-cube'/>
			<div className='f-cube4 f-cube'/>
			<div className='f-cube3 f-cube'/>
		</div>
	);
}