import React, { PropTypes } from 'react';
import {CSS, default as loadCSS} from './css.js';
import Sidebar from '../../shared/elements/nav/sidebar.js';
import NavLink from '../../shared/elements/nav/nav-link.js';
import Banner from '../../shared/elements/nav/Banner.js';

function sidebarChildren(pages, prefix = '/') {
	let links = [];
	for (let key in pages) {
		links.push(<NavLink href={prefix + pages[key]}>{key}</NavLink>)
	}
	return links;
}

export default function Layout(props) {
	return (
		<div>
			<Sidebar active={props.active}>
				{sidebarChildren(props.sidebar, props.prefix)}
			</Sidebar>
			<Banner user={props.user}>{props.banner}</Banner>
			<main className='main'>
				{props.children}
			</main>
		</div>
	)
}

Layout.propTypes = {
	active: PropTypes.string,
	user: PropTypes.string
}

Layout.defaultTypes = {
	user: 'John Smith'
}