import React, { Component, PropTypes } from 'react';
import IconButton from 'elements/icon/button.js';

/**
 * Sidebar component for the map editor page.
 */
export default class MapSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {mode: this.props.mode}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.mode && nextProps.mode !== this.state.mode) {
			this.setMode(mode);
		}
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
			mode: PropTypes.oneOf(['add', 'select'])
		}
	}

	static defaultProps() {
		return {
			onModeChange: mode => {},
			initialMode: undefined
		}
	}
}