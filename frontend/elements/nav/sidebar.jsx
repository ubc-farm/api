import React, { PropTypes } from 'react';
import NavLink from './nav-link.js';

/**
 * The sidebar of the site.
 */
export default function Sidebar(props) {
	let {active} = props;
	return (
		<aside class='nav-list' role='navigation'>
			<NavLink name={active} active hide={active}/>
			<nav className='nav-list-primary'>
				<NavLink name='Fields' hide={active === 'Fields'} color/>
				<NavLink name='Planning' hide={active === 'Planning'} color/>
				<NavLink name='Finances' hide={active === 'Finances'} color/>
				<NavLink name='Events' hide={active === 'Events'} color/>
				<NavLink name='Logging' hide={active === 'Logging'} color/>
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