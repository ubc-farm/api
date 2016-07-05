import React, { PropTypes, Children } from 'react';
import {Link, navigateTo} from 'app/navigation'
import {connect} from 'react-redux';

const mainPages = ['Fields', 'Planning', 'Finances', 'Events', 'Logging'];

/**
 * The sidebar of the site.
 * @param {string} props.active - specify the current page category
 */
export const SidebarComponent = ({secondary = {}, active, onLinkClick}) => {
	const primaryChildren = mainPages.map(page => {
		if (active.toLowerCase() === page.toLowerCase()) return null;
		else return (
			<Link className='nav-color' 
			      onClick={onLinkClick} 
			      href={'/' + page.toLowerCase()}
				>
				{page}
			</Link>
		) 
	});

	const secondaryChildren = Object.keys(secondary).map(href => {
		const name = secondary[href];
		if (name === null) return <hr/>
		else return <Link href={href} onClick={onLinkClick}>{name}</Link>
	})

	return (
		<aside className='nav-list' aria-role='navigation'>
			<Link className='nav-action nav-color' 
			      onClick={onLinkClick} 
			      href={'/' + active.toLowerCase()}
			>
				{active}
			</Link>

			<nav className='nav-list-primary'>
				{primaryChildren}
			</nav>

			<nav className='nav-list-secondary'>
				{secondaryChildren}
			</nav>

			<nav className='nav-list-extra'>
				<Link href='/user/account' onClick={onLinkClick}>Account</Link>
				<Link href='/user/settings' onClick={onLinkClick}>Settings</Link>
			</nav>
		</aside>
	)
}

SidebarComponent.propTypes = {
	active: PropTypes.string.isRequired,
	secondary: PropTypes.object,
	onLinkClick: PropTypes.func
};

const StatefulSidebar = connect(
	state => ({
		active: state.navigation.currentActivePage,
		secondary: state.navigation.subPages
	}),
	dispatch => ({
		onLinkClick: href => dispatch( navigateTo(href) )
	})
)(SidebarComponent);

export default StatefulSidebar;