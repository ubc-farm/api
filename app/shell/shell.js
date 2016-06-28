import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';

import Sidebar from '../_components/nav/sidebar.js';
import NavLink from '../_components/nav/nav-link.js';
import Banner from '../_components/nav/Banner.js';

function sidebarChildren(pages ={}, prefix = '/') {
	return Object.keys(pages).map(key => {
		const value = pages[key];
		if (value === null) return <hr/>
		else return <NavLink href={prefix + value}>{key}</NavLink>
	})
}

export default function Shell(props) {
	return (
		<Provider store={props.store}>
			<Sidebar active={props.active}>
				{sidebarChildren(props.sidebar, props.prefix)}
			</Sidebar>
			<Banner user={props.user}>{props.banner}</Banner>
			<main className='main'>
				{props.children}
			</main>
		</Provider>
	)
}

Shell.propTypes = {
	active: PropTypes.string,
	user: PropTypes.string,
	sidebar: PropTypes.object,
	banner: PropTypes.node
}

Shell.defaultTypes = {
	user: 'John Smith'
}