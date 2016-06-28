import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Element used to indicate loading
 */
export default function LoadingIndicator({className, hidden}) {
	return r(
		'div', 
		{
			className: _('folding-cube', className),
			'aria-role': 'progressbar', hidden
		}, 
		[1, 2, 4, 3].map(i => {
			return r('div', {className: `f-cube f-cube${i}`});
		})
	)
}