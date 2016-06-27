import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';
import IconButton from '../icon/button.js';

/**
 * An element that can collaspe and expand.
 */
export default class Expando extends Component {
	constructor(props) {
		super(props);
		this.state = {expanded: false};
		this.toggleExpansion = this.toggleExpansion.bind(this);
	}

	toggleExpansion() {
		this.setState(prevState => {
			return {expanded: !prevState.expanded}
		})
	}

	render() {
		const classList = _('expando', {'expando-open': this.state.expanded});
		return (
			<div className={classList} aria-expanded={this.state.expanded}>
				{this.props.children}
				<IconButton onClick={this.toggleExpansion} className='expando-button'>
					{this.props.text}
				</IconButton>
			</div>
		)
	}

	static get propTypes() {
		return {
			text: PropTypes.string
		}
	}
}