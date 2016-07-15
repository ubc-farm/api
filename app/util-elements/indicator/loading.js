import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Element used to indicate loading
 */
const LoadingIndicator = ({className, hidden}) => (
	<div 
		aria-role='progressbar' 
		className={_('folding-cube', className)}
		hidden={hidden}
	>
		<div className='f-cube f-cube1'/>
		<div className='f-cube f-cube2'/>
		<div className='f-cube f-cube4'/>
		<div className='f-cube f-cube3'/>
	</div>
)

LoadingIndicator.propTypes = {
	className: PropTypes.string,
	hidden: PropTypes.bool
}

export default LoadingIndicator;