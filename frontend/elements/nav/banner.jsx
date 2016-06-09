import React, { PropTypes } from 'react';

/**
 * Used for the site banner. The banner acts as a bar with controls for
 * the page, so the buttons will change depending on the page.
 */
export default function Banner(props) {
	return (
		<header className='banner'>
			{props.children}
			<a className='user-button' href='/user/account'>{props.user}</a>
		</header>
	);
}
Banner.propTypes = {
	user: PropTypes.string
};
Banner.defaultProps = { user: 'John White' };