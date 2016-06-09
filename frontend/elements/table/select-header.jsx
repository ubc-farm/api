import React, { Component, PropTypes } from 'react';
import TableHeader from './header.jsx';

/**
 * An alternate header for the table that appears once one or more items are
 * selected by the user.
 */
export default class SelectedTableHeader extends Component {
	shouldComponentUpdate({selected: newSelect}) {
		let {selected} = this.props
		newSelect = newSelect > -1 ? newSelect : 0;
		return selected !== newSelect;
	}

	render() {
		return (
			<TableHeader className='table-header-selectmenu' 
			             hidden={(this.props.selected < 1)}>
				<span className='table-header-selectmenu-state'>
					{this.props.selected} 
					item{this.props.selected > 1 ? 's' : ''} 
					selected
				</span>
				{this.props.children}
			</TableHeader>
		);
	}

	static get defaultProps() {
		return {selected: 0}
	}
}