import React, { PropTypes } from 'react';
import {Link, navigateTo} from 'app/navigation'

/**
 * Used for the site banner. The banner acts as a bar with controls for
 * the page, so the buttons will change depending on the page.
 */
export const BannerComponent = ({children, user, onUserClick}) => (
	<header className='banner'>
		{children}

		<Link className='user-button' 
		      onClick={onUserClick}
		      href='/user/account'
		>
			{user}
		</Link>
	</header>
)

BannerComponent.propTypes = {
	user: PropTypes.string
}

BannerComponent.defaultProps = {
	user: 'John White'
}

const StatefulBanner = connect(
	state => {},
	dispatch => ({
		onLinkClick: href => dispatch( navigateTo(href) )
	})
)(SidebarComponent);

export default StatefulBanner;