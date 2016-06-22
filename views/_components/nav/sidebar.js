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
			<NavLink active>{active}</NavLink>
			<nav className='nav-list-primary'>
				<NavLink hide={l === 'fields'} color>Fields</NavLink>
				<NavLink hide={l === 'planning'} color>Planning</NavLink>
				<NavLink hide={l === 'finances'} color>Finances</NavLink>
				<NavLink hide={l === 'events'} color>Events</NavLink>
				<NavLink hide={l === 'logging'} color>Logging</NavLink>
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