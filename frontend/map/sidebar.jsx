import React, { Component, PropTypes } from 'react';
import IconButton from 'elements/icon/button.js';
import NumberField from 'elements/form/number-field.js';
import AngleIndicator from 'elements/info/angle-indicator.js';
import LoadingIndicator from 'elements/info/loading.js';
import {field as fieldStyle} from 'map/shapes/style.js';

/**
 * Sidebar component for the map editor page.
 */
export default class MapSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: this.props.initialMode,
			angle: 25,
			width: 2, height: 2,
			polygon: null,
			gridSettingsChanged: false,
			loading: false
		}

		this.setPolygon = this.setPolygon.bind(this);
		this.submit = this.submit.bind(this);
		this.valueChanged = this.valueChanged.bind(this);
	}

	componentDidMount() {
		//Uses a normal event listener to cancel form submission
		this._form.addEventListener('submit', e => {
			e.preventDefault();
			this.submit();
			return false;
		})
	}

	/**
	 * Form submission event.
	 * @event MapSidebar#submit
	 * @type {Object}
	 * @property {google.maps.Polygon} polygon associated with the grid
	 * @property {number} angle for the grid, in degrees 0 - 360.
	 * @property {number} width of the grid
	 * @property {number} height of the grid
	 */

	/**
	 * Submits updates to the grid to the callback, then displays a loading 
	 * indicator while waiting for the promise to resolve.
	 * @param {Object} newState - used when setState may still be pending
	 * @fires MapSidebar#submit
	 */
	submit(newState) {
		let {angle, width, height, polygon} = this.state;
		let payload = Object.assign({angle, width, height, polygon}, newState);
		this.setState({gridSettingsChanged: false, loading: true});
		//Promise.resolve() ensures the callback acts like a promise.
		Promise.resolve(this.props.updateGrid(payload)) 
		.then(() => this.setState({loading: false}))
		.catch(err => console.error(err));
	}

	/** 
	 * Function to set the focused polygon for the form
	 * @public 
	 */
	setPolygon(newPolygon) {
		//Code to check if the exact same polygon was set
		if (newPolygon.active) return;
		let oldPolygon = this.state.polygon;
		if (oldPolygon) {
			oldPolygon.active = false;
			oldPolygon.setOptions(fieldStyle.normal);
		}
		newPolygon.active = true;
		newPolygon.setOptions(fieldStyle.selected);

		this.valueChanged('tab', 'select');   //switch to select mode
		this.setState({polygon: newPolygon}); //set the polygon
		if (newPolygon.gridOptions) {         //create a grid
			let {angle, width, height} = newPolygon.gridOptions;
			this.setState({angle, width, height});
			this.submit({polygon: newPolygon, angle, width, height});
		} else {
			this.submit({polygon: newPolygon});   
		}
		
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
				this.setState({gridSettingsChanged: true});
				this.setState( {[field]: parseFloat(newValue)} );
				break;
			default:
				this.setState( {[field]: newValue} )
				break;
		}
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

	render() {
		return (
			<div>
				<header className='buttons-half'>
					<IconButton {...this.buttonProps('add')} icon='add'>
						Add Field
					</IconButton>
					<IconButton {...this.buttonProps('select')} icon='edit'>
						Select
					</IconButton>
				</header> 
				<form ref={f => this._form = f} className='form-divided'>
					<IconButton {...this.buttonProps('resize')} icon='transform'
					            className='colored' disabled={!this.state.polygon}>
						Resize Outline
					</IconButton>
					<section id='grid-config' className='footer-button'>
						<section id='grid-angle'>
							<NumberField min={0} max={360} step={5} 
							             onChange={this.valueChanged.bind(this, 'angle')}
													 value={this.state.angle} className='angle-field'
													 suffix='°' id='grid-config-angle'
													 error='Angle must be between 0 and 360'>
								Grid Angle
							</NumberField>
							<AngleIndicator angle={this.state.angle}/>
						</section>
						<section id='grid-size'>
							<NumberField min={0} id='grid-config-width' suffix='m' 
							             value={this.state.width}
							             onChange={this.valueChanged.bind(this, 'width')}>
								Grid Width
							</NumberField>
							<NumberField min={0} id='grid-config-height' suffix='m'
							             value={this.state.height}
							             onChange={this.valueChanged.bind(this, 'height')}>
								Grid Height
							</NumberField>
						</section>
						<LoadingIndicator hidden={!this.state.loading}/>
						<IconButton type='submit' icon='done' className='right colored'
						            disabled={!this.state.gridSettingsChanged}>
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
			updateGrid: PropTypes.func, //should return a Promise
			initialMode: PropTypes.oneOf(['add', 'select'])
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