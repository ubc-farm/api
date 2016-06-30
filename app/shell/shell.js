import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';

import Sidebar from './sidebar.js';
import NavLink from './nav-link.js';
import Banner from './banner.js';

function sidebarChildren(pages ={}, prefix = '/') {
	return Object.keys(pages).map(key => {
		const value = pages[key];
		if (value === null) 
			return <hr/>
		else 
			return <NavLink key={prefix + value} href={prefix + value}>{key}</NavLink>
	})
}

export default function Shell(props) {
	return (
		<Provider><div>
			<Sidebar active={props.active}>
				{sidebarChildren(props.sidebar, props.prefix)}
			</Sidebar>
			<Banner user={props.user}>{props.banner}</Banner>
			<main className='main'>
				{props.children}
			</main>
		</div></Provider>
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