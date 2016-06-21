import React, { PropTypes } from 'react';
import NavLink from './nav-link.js';

/**
 * The sidebar of the site.
 * @param {string} props.active - specify the current page category
 */
export default function Sidebar(props) {
	let {active} = props;
	let l = active.toLowerCase();
	return (
		<aside class='nav-list' role='navigation'>
			<NavLink name={active} active hide={active}/>
			<nav className='nav-list-primary'>
				<NavLink hide={l === 'fields'} color>Fields</NavLink>
				<NavLink hide={l === 'planning'} color>Planning</NavLink>
				<NavLink hide={l === 'finances'} color>Finances</NavLink>
				<NavLink hide={l === 'events'} color>Events</NavLink>
				<NavLink hide={l === 'logging'} color>Logging</NavLink>
			</nav>
			<nav class='nav-list-secondary'>
				{props.children}
			</nav>
			<nav className='nav-list-extra'>
				<NavLink name='Account' prefix='/user/'/>
				<NavLink name='Settings' prefix='/user/'/>
			</nav>
		</aside>
	);
}
Sidebar.propTypes = {
	active: PropTypes.string
};