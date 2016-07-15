import React, { PropTypes } from 'react';
import classList from 'lib/utils/classlist';

const Link = ({href, onClick, children, className}) => {
	className = classList(
		className, 
		'nav-link', 
		'hover-light'
	);

	const onClickHandler = onClick ? 
		e => {e.preventDefault(); onClick(href);} 
		: undefined;

	return (
		<a href={href}
			className={className}
			onClick={onClickHandler}
		>
			{children}
		</a>
	)
}

Link.propTypes = {
	href: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.node
}

export default Link