import React, { Component, PropTypes } from 'react';
import IconButton from 'elements/icon/button.jsx';

/**
 * Sidebar component for the map editor page.
 */
export default class MapSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {mode: this.props.initialMode}
	}

	setMode(mode) {
		this.setState({mode: mode});
		this.props.onModeChange(mode);
	}

	buttonProps(mode) {
		return {
			className: this.state.mode === mode ? 'hover-toggle' : null,
			onClick: this.setMode.bind(this, mode)
		}
	}

	render() {
		return (
			<div>
				<IconButton {...this.buttonProps('add')} icon='add'>
					Add Field
				</IconButton>
				<IconButton {...this.buttonProps('select')} icon='edit'>
					Select
				</IconButton>
			</div>
		);
	}

	static propTypes() {
		return {
			onModeChange: PropTypes.func,
			initialMode: PropTypes.oneOf(['add', 'select'])
		}
	}

	static defaultProps() {
		return {
			onModeChange: mode => {},
			initialMode: undefined
		}
	}
}