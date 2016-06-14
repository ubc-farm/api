import React, { Component, PropTypes } from 'react';
import IconButton from 'elements/icon/button.js';
import NumberField from 'elements/form/number-field.js';
import AngleIndicator from 'elements/info/angle-indicator.js';

/**
 * Sidebar component for the map editor page.
 */
export default class MapSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: this.props.mode,
			angle: 0,
			width: 1, height: 1,
			polygon: null
		}

		this.setPolygon = this.setPolygon.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.mode && nextProps.mode !== this.state.mode) {
			this.setMode(mode);
		}
	}

	componentDidMount() {
		/**
		 * @alias submit
		 * @memberof MapSidebar
		 */
		this._form.addEventListener('submit', e => {
			e.preventDefault();
			let {angle, width, height, polygon} = this.state;
			this.props.updateGrid({angle, width, height, polygon});
			return false;
		})
	}

	/**
	 * Creates shared properties for buttons
	 * @param {string} mode
	 * @returns {Object} new props for the button
	 */
	buttonProps(mode) {
		return {
			className: this.state.mode === mode ? 'hover-toggle' : null,
			onClick: this.valueChanged.bind(this, 'tab', mode)
		}
	}

	/** Public function to set the focused polygon for the form */
	setPolygon(newPolygon) {
		this.setState({polygon: newPolygon});
	}

	/**
	 * Callback function for text fields and other components with changing
	 * values. 
	 * @param {string} field - identifier for the field
	 * @param {any} newValue - the new value to use
	 */
	valueChanged(field, newValue) {
		switch (field) {
			case 'tab':
				this.setState({mode: newValue});
				this.props.onModeChange(newValue);
				break;
			case 'angle':
			case 'width':
			case 'height':
			default:
				this.setState( {[field]: newValue} )
				break;
		}
	}

	render() {
		return (
			<div>
				<header>
					<IconButton {...this.buttonProps('add')} icon='add'>
						Add Field
					</IconButton>
					<IconButton {...this.buttonProps('select')} icon='edit'>
						Select
					</IconButton>
				</header>
				<form hidden={!this.props.polygon} ref={f => this._form = f}>
					<IconButton {...this.buttonProps('resize')} icon='transform'>
						Resize Outline
					</IconButton>
					<section id='grid-config'>
						<section id='grid-angle'>
							<NumberField min={0} max={360} step={5} 
							             onChange={this.valueChanged.bind(this, 'angle')}
													 suffix='°' key='grid-config-angle'
													 error='Angle must be between 0 and 360'>
								Grid Angle
							</NumberField>
							<AngleIndicator angle={this.state.angle}/>
						</section>
						<section id='grid-size'>
							<NumberField min={0} key='grid-config-width' suffix='m' 
							             onChange={this.valueChanged.bind(this, 'width')}>
								Grid Width
							</NumberField>
							<NumberField min={0} key='grid-config-height' suffix='m'
							             onChange={this.valueChanged.bind(this, 'height')}>
								Grid Height
							</NumberField>
						</section>
						<IconButton type='submit' icon='done'>
							Update grid
						</IconButton>
					</section>
				</form>
			</div>
		);
	}

	static propTypes() {
		return {
			onModeChange: PropTypes.func,
			updateGrid: PropTypes.func,
			mode: PropTypes.oneOf(['add', 'select'])
		}
	}

	static defaultProps() {
		return {
			onModeChange: mode => {},
			updateGrid: gridData => {},
			initialMode: undefined
		}
	}
}