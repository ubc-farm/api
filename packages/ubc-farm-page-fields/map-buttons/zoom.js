import {createElement as h, PureComponent, PropTypes} from 'react';
/** @jsx h */
import MapButton from './base.js';

export default class ZoomButtons extends PureComponent {
	static get propTypes() {return {
		map: PropTypes.any.isRequired
	}}

	constructor(props) {
		super(props);

		this.handleZoomInClick = this.handleZoomInClick.bind(this);
		this.handleZoomOutClick = this.handleZoomOutClick.bind(this);
	}

	handleZoomInClick() {
		const {map} = this.props;
		map.setZoom(map.getZoom() + 1);
	}

	handleZoomOutClick() {
		const {map} = this.props;
		map.setZoom(map.getZoom() - 1);
	}

	render() {
		return (
			<div className='map-menu zoom-buttons'>
				<MapButton onClick={this.handleZoomInClick}>zoom_in</MapButton>
				<MapButton onClick={this.handleZoomOutClick}>zoom_out</MapButton>
			</div>
		);
	}
}