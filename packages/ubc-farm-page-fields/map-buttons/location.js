import {createElement as h, PureComponent, PropTypes} from 'react';
/** @jsx h */
import MapButton from './base.js';

class PermissionError extends Error {}

/**
 * Promise version of navigator.geolocation.getCurrentPosition.
 * Checks if the permission needed has been denied first, and if so
 * throws a PermissionError.
 * @param {PositionOptions} [options]
 * @returns {Promise<Position>}
 * @throws {Promise<PermissionError>} if the permission has been denied
 * @throws {Promise<PositionError>} if geolocation fails
 */
function getCurrentPosition(options) {
	return navigator.permissions.query({name: 'geolocation'}).then(result => {
		switch (result.state) {
			case 'granted': case 'prompt':
				return new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, options);
				})
			case 'denied':
				throw new PermissionError();
		}
	})
}

/**
 * Button used to get the location of the user so it can be displayed on a map
 */
export default class LocationButton extends PureComponent {
	static get propTypes() {return {
		onPositionChange: PropTypes.func,
		onClick: PropTypes.func
	}}

	static get defaultProps() {return {
		onPositionChange() {},
		onClick() {}
	}}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			disabled: false,
			loading: false
		}
	}

	updateLocation() {
		if (this.state.loading) return Promise.reject('loading');
		return getCurrentPosition().then(position => {
			this.props.onPositionChange(position);
			this.setState({ loading: false });
		}).catch(err => {
			if (err instanceof PermissionError) this.setState({ disabled: true });
			else throw err;
		});
	}

	handleClick() {
		this.updateLocation();
		this.props.onClick();
	}

	get icon() {
		const {disabled, loading} = this.state;
		if (disabled) return 'location_disabled';
		else if (loading) return 'loading_searching';
		else return 'my_location';
	}

	render() {
		return (
			<MapButton disabled={this.state.disabled}
				onClick={this.handleClick}
			>
				{this.icon}
			</MapButton>
		);
	}
}