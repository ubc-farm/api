import React, { PropTypes } from 'react';

/**
 * Element used to display an angle via CSS transforms
 */
export default function AngleIndicator(props) {
	const style = {transform: `rotate(${props.angle}deg)`};
	return (
		<span className='circle angle-indicator'>
			<div style={style} className='angle-indicator-dial'/>
		</span>
	);
}