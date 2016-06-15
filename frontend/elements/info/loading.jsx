import React, { PropTypes } from 'react';

export default function LoadingIndicator(props) {
	return (
		<div className='folding-cube' aria-role='progressbar' hidden={props.hidden}>
			<div className='f-cube1 f-cube'/>
			<div className='f-cube2 f-cube'/>
			<div className='f-cube4 f-cube'/>
			<div className='f-cube3 f-cube'/>
		</div>
	);
}