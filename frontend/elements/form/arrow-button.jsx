import React, { PropTypes } from 'react';
import _ from '../classnames.js';

export default function ArrowButton(props) {
	return (
		<button className={_(
			'arrow hover-light circle', 
			{
				'left-arrow': this.props.dir === 'left',
				'right-arrow': this.props.dir === 'right'
			}
		)}></button>
	);
}
ArrowButton.propTypes = {
	dir: PropTypes.oneOf(['left', 'right']).isRequired
}