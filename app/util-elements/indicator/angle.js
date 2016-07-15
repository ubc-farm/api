import { createElement as r, PropTypes } from 'react';

/**
 * Element used to display an angle via CSS transforms
 */
export default function AngleIndicator({angle}) {
	return r('span', {className: 'circle angle-indicator'},
		r('div', {
			className: 'angle-indicator-dial',
			style: {transform: `rotate(${angle}deg)`}
		})
	);
}

AngleIndicator.propTypes = {
	angle: PropTypes.number
}