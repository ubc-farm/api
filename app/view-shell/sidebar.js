import React, { PropTypes } from 'react';
import NavLink from './nav-link.js';

/**
 * The sidebar of the site.
 * @param {string} props.active - specify the current page category
 */
export default function Sidebar(props) {
	const {active = ''} = props;
	const l = active.toLowerCase();
	return (
		<aside className='nav-list' role='navigation'>
			<NavLink active color>{active}</NavLink>
			<nav className='nav-list-primary'>
				<NavLink hide={l === 'fields'}>Fields</NavLink>
				<NavLink hide={l === 'planning'}>Planning</NavLink>
				<NavLink hide={l === 'finances'}>Finances</NavLink>
				<NavLink hide={l === 'events'}>Events</NavLink>
				<NavLink hide={l === 'logging'}>Logging</NavLink>
			</nav>
			<nav className='nav-list-secondary'>
				{props.children}
			</nav>
			<nav className='nav-list-extra'>
				<NavLink prefix='/user/'>Account</NavLink>
				<NavLink prefix='/user/'>Settings</NavLink>
			</nav>
		</aside>
	);
}
Sidebar.propTypes = {
	active: PropTypes.string
};