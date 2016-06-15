import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * A small button with a left or right arrow icon. 
 */
export default function ArrowButton(props) {
	return (
		<button className={_(
			'arrow hover-light circle', 
			{
				'left-arrow': props.dir === 'left',
				'right-arrow': props.dir === 'right'
			}
		)}></button>
	);
}
ArrowButton.propTypes = {
	dir: PropTypes.oneOf(['left', 'right']).isRequired
}